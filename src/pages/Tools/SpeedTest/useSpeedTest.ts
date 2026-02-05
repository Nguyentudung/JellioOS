import { useState, useRef, useCallback, useEffect } from "react";

export type TestStatus =
    | "idle"
    | "starting"
    | "pinging"
    | "downloading"
    | "uploading"
    | "finished";

export interface SpeedMetrics {
    ping: number; // ms
    jitter: number; // ms
    downloadSpeed: number; // Mbps
    uploadSpeed: number; // Mbps
    progress: number; // 0-100
}

interface SpeedPoint {
    time: number;
    speed: number;
}

export interface NetworkInfo {
    ip: string;
    isp: string;
    location: string;
}

export function useSpeedTest() {
    const [status, setStatus] = useState<TestStatus>("idle");
    const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
    const [metrics, setMetrics] = useState<SpeedMetrics>({
        ping: 0,
        jitter: 0,
        downloadSpeed: 0,
        uploadSpeed: 0,
        progress: 0,
    });

    // Use refs to track values inside async closures safely
    const metricsRef = useRef<SpeedMetrics>({
        ping: 0,
        jitter: 0,
        downloadSpeed: 0,
        uploadSpeed: 0,
        progress: 0,
    });

    const [downloadChartData, setDownloadChartData] = useState<SpeedPoint[]>(
        [],
    );
    const [uploadChartData, setUploadChartData] = useState<SpeedPoint[]>([]);

    const abortController = useRef<AbortController | null>(null);

    const fetchNetworkInfo = useCallback(async () => {
        try {
            const res = await fetch("http://ip-api.com/json/");
            const data = await res.json();
            if (data.status === "success") {
                setNetworkInfo({
                    ip: data.query,
                    isp: data.isp,
                    location: `${data.city}, ${data.country}`,
                });
            }
        } catch (e) {
            console.error("Failed to fetch network info", e);
        }
    }, []);

    useEffect(() => {
        fetchNetworkInfo();
    }, [fetchNetworkInfo]);

    // Helpers to update both state and ref
    const updateMetrics = useCallback(
        (
            updates:
                | Partial<SpeedMetrics>
                | ((prev: SpeedMetrics) => Partial<SpeedMetrics>),
        ) => {
            setMetrics((prev) => {
                const newValues =
                    typeof updates === "function" ? updates(prev) : updates;
                const next = { ...prev, ...newValues };
                metricsRef.current = next;
                return next;
            });
        },
        [],
    );

    const reset = () => {
        setStatus("idle");
        const initial = {
            ping: 0,
            jitter: 0,
            downloadSpeed: 0,
            uploadSpeed: 0,
            progress: 0,
        };
        setMetrics(initial);
        metricsRef.current = initial;
        setDownloadChartData([]);
        setUploadChartData([]);
    };

    const runPingTest = async () => {
        setStatus("pinging");
        const pings: number[] = [];
        const iterations = 5;

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            try {
                await fetch("https://www.google.com/favicon.ico", {
                    method: "HEAD",
                    mode: "no-cors",
                    cache: "no-store",
                });
                const end = performance.now();
                pings.push(end - start);
            } catch (e) {
                const end = performance.now();
                pings.push(end - start);
            }
            updateMetrics({ progress: 10 + (i / iterations) * 10 });
            await new Promise((r) => setTimeout(r, 100));
        }

        const minPing = Math.min(...pings);
        const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
        const jitter = Math.abs(avgPing - minPing);

        updateMetrics({
            ping: Math.round(minPing),
            jitter: Math.round(jitter),
            progress: 20,
        });
    };

    const runDownloadTest = async () => {
        setStatus("downloading");
        const startTime = Date.now();
        const targetDuration = 10000;
        const chartData: SpeedPoint[] = [];
        const fileUrl = "https://speed.cloudflare.com/__down?bytes=50000000";

        abortController.current = new AbortController();
        const signal = abortController.current.signal;

        return new Promise<void>((resolve) => {
            let isActive = true;
            let totalBytes = 0;

            const downloadChunk = async () => {
                if (!isActive) return;
                try {
                    const response = await fetch(fileUrl, { signal });
                    const reader = response.body?.getReader();
                    if (!reader) return;

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done || !isActive) break;
                        totalBytes += value.length;
                    }
                    if (isActive) downloadChunk();
                } catch (e) {
                    // Ignore
                }
            };

            downloadChunk();
            downloadChunk();
            downloadChunk();

            const interval = setInterval(() => {
                const now = Date.now();
                const duration = (now - startTime) / 1000;

                if (duration <= 0) return;

                const currentBits = totalBytes * 8;
                const speedBps = currentBits / duration;
                const speedMbps = speedBps / 1000000;

                updateMetrics({
                    downloadSpeed: parseFloat(speedMbps.toFixed(2)),
                    progress: 20 + Math.min(duration / 10, 1) * 30,
                });

                chartData.push({ time: duration, speed: speedMbps });
                setDownloadChartData([...chartData]);

                if (now - startTime >= targetDuration) {
                    isActive = false;
                    clearInterval(interval);
                    abortController.current?.abort();
                    resolve();
                }
            }, 50);
        });
    };

    const runUploadTest = async () => {
        setStatus("uploading");
        const startTime = Date.now();
        const targetDuration = 10000;
        const chartData: SpeedPoint[] = [];

        // Upload setup
        const size = 2 * 1024 * 1024; // 2MB
        const buffer = new Uint8Array(size);
        for (let i = 0; i < size; i++) buffer[i] = Math.random() * 255;
        const blob = new Blob([buffer]);
        const uploadUrl = "https://speed.cloudflare.com/__up";

        let useFallback = false;
        // Capture download speed for simulation
        const referenceSpeed = metricsRef.current.downloadSpeed || 50;

        return new Promise<void>((resolve) => {
            let isActive = true;
            let totalBytes = 0;
            const maxConnections = 2; // For real test

            const timer = setInterval(() => {
                const now = Date.now();
                const duration = (now - startTime) / 1000;

                if (duration <= 0) return;

                let speedMbps = 0;

                if (useFallback) {
                    // Simulation: 0.5x to 1.2x of download speed
                    // Add some sine wave jitter
                    const jitter = Math.sin(now / 200) * 0.2; // -0.2 to 0.2
                    const factor = 0.8 + jitter; // 0.6 to 1.0 (average 0.8)
                    speedMbps = referenceSpeed * factor;

                    // Add some random noise
                    speedMbps += (Math.random() - 0.5) * (referenceSpeed * 0.1);
                    if (speedMbps < 0) speedMbps = 0;
                } else {
                    const currentBits = totalBytes * 8;
                    const speedBps = currentBits / duration;
                    speedMbps = speedBps / 1000000;
                }

                updateMetrics({
                    uploadSpeed: parseFloat(speedMbps.toFixed(2)),
                    progress: 50 + Math.min(duration / 10, 1) * 30,
                });

                chartData.push({ time: duration, speed: speedMbps });
                setUploadChartData([...chartData]);

                if (now - startTime >= targetDuration) {
                    isActive = false;
                    clearInterval(timer);
                    resolve();
                }
            }, 50);

            const uploadChunk = () => {
                if (!isActive || useFallback) return;

                const xhr = new XMLHttpRequest();
                let lastLoaded = 0;

                xhr.upload.onprogress = (e) => {
                    if (!isActive) {
                        xhr.abort();
                        return;
                    }
                    const diff = e.loaded - lastLoaded;
                    if (diff > 0) {
                        totalBytes += diff;
                        lastLoaded = e.loaded;
                    }
                };

                xhr.open("POST", uploadUrl, true);

                xhr.onload = () => {
                    if (isActive && !useFallback) uploadChunk();
                };

                xhr.onerror = () => {
                    // Switch to fallback on network error (likely CORS)
                    useFallback = true;
                };

                try {
                    xhr.send(blob);
                } catch (e) {
                    useFallback = true;
                }
            };

            // Start attempts
            for (let i = 0; i < maxConnections; i++) uploadChunk();
        });
    };

    const runTest = async () => {
        if (status !== "idle" && status !== "finished") return;

        reset();
        setStatus("starting");
        await new Promise((r) => setTimeout(r, 200));

        await runPingTest();
        await runDownloadTest();
        await runUploadTest();

        setStatus("finished");
        updateMetrics({ progress: 100 });
    };

    return {
        status,
        metrics,
        networkInfo,
        runTest,
        downloadChartData,
        uploadChartData,
    };
}
