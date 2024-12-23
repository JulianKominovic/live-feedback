import { create } from "zustand";
import deepMerge from "deepmerge";
import {
  IVitalsScore,
  initPerfume,
  type IPerfumeNavigationTiming,
} from "perfume.js";
import { searchBrokenResources } from "../logic/devtools";
import { BrokenResources } from "../types/Devtoolts";

export type DevtoolsStore = {
  findBrokenResources: () => Promise<void>;
  brokenResources: BrokenResources[];
  metrics?: {
    dnsLookupTime?: { value: number; score: IVitalsScore };
    fetchTime?: { value: number; score: IVitalsScore };
    workerTime?: { value: number; score: IVitalsScore };
    downloadTime?: { value: number; score: IVitalsScore };
    storageEstimate?: { value: number; score: IVitalsScore };
    NTBT?: { value: number; score: IVitalsScore };
    TTFB?: { value: number; score: IVitalsScore };
    RT?: { value: number; score: IVitalsScore };
    FCP?: { value: number; score: IVitalsScore };
    FID?: { value: number; score: IVitalsScore };
    LCP?: { value: number; score: IVitalsScore };
    CLS?: { value: number; score: IVitalsScore };
    INP?: { value: number; score: IVitalsScore };
    TBT?: { value: number; score: IVitalsScore };
    elPageTitle?: { value: number; score: IVitalsScore };
    userJourneyStep?: { value: number; score: IVitalsScore };
    performanceResourceTiming?: {
      name: PerformanceResourceTiming["name"];
      duration: PerformanceResourceTiming["duration"];
      deliveryType?: "cache" | "";
      transferSize: PerformanceResourceTiming["transferSize"];
      // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/initiatorType
      initiator: PerformanceResourceTiming["initiatorType"];
    }[];
  };
};

const useDevtools = create<DevtoolsStore>(() => ({
  metrics: undefined,
  brokenResources: [],
  findBrokenResources: async () => {
    const brokenResources = await searchBrokenResources();
    useDevtools.setState({ brokenResources });
  },
}));

function deepMergeDevtools(newData: Partial<DevtoolsStore>) {
  useDevtools.setState((state) => ({
    metrics: deepMerge(state.metrics || {}, newData.metrics || {}),
  }));
}

initPerfume({
  resourceTiming: true,
  analyticsTracker: (options) => {
    const { metricName, data, rating: score } = options;
    switch (metricName) {
      case "navigationTiming":
        if (data && (data as any).timeToFirstByte) {
          const {
            timeToFirstByte,
            dnsLookupTime,
            downloadTime,
            fetchTime,
            redirectTime,
            totalTime,
            workerTime,
          } = data as IPerfumeNavigationTiming;
          deepMergeDevtools({
            metrics: {
              TTFB: { value: timeToFirstByte || 0, score },
              RT: { value: redirectTime || 0, score },
              dnsLookupTime: { value: dnsLookupTime || 0, score },
              downloadTime: { value: downloadTime || 0, score },
              fetchTime: { value: fetchTime || 0, score },
              workerTime: { value: workerTime || 0, score },
              NTBT: { value: totalTime || 0, score },
            },
          });
        }
        break;
      case "storageEstimate":
        deepMergeDevtools({
          metrics: {
            storageEstimate: { value: data as number, score },
          },
        });
        break;
      case "TTFB":
        deepMergeDevtools({
          metrics: { TTFB: { value: data as number, score } },
        });
        break;
      case "RT":
        deepMergeDevtools({
          metrics: { RT: { value: data as number, score } },
        });
        break;
      case "FCP":
        deepMergeDevtools({
          metrics: { FCP: { value: data as number, score } },
        });
        break;
      case "FID":
        deepMergeDevtools({
          metrics: { FID: { value: data as number, score } },
        });
        break;
      case "LCP":
        deepMergeDevtools({
          metrics: { LCP: { value: data as number, score } },
        });
        break;
      case "CLS":
        deepMergeDevtools({
          metrics: { CLS: { value: data as number, score } },
        });
        break;
      case "INP":
        deepMergeDevtools({
          metrics: { INP: { value: data as number, score } },
        });
        break;
      case "TBT":
        deepMergeDevtools({
          metrics: { TBT: { value: data as number, score } },
        });
        break;
      case "elPageTitle":
        deepMergeDevtools({
          metrics: { elPageTitle: { value: data as number, score } },
        });
        break;
      case "userJourneyStep":
        deepMergeDevtools({
          metrics: { userJourneyStep: { value: data as number, score } },
        });
        break;
      case "resourceTiming":
        if (
          (data as PerformanceResourceTiming).transferSize > 0 &&
          (data as PerformanceResourceTiming).duration > 1000 &&
          (data as PerformanceResourceTiming).decodedBodySize > 0
        )
          deepMergeDevtools({
            metrics: {
              performanceResourceTiming: [
                {
                  name: (data as PerformanceResourceTiming).name,
                  initiator: (data as PerformanceResourceTiming).initiatorType,
                  duration: (data as PerformanceResourceTiming).duration,
                  deliveryType:
                    // @ts-expect-error - Doesn't know about the `deliveryType` prop
                    (data as PerformanceResourceTiming).deliveryType,
                  transferSize: (data as PerformanceResourceTiming)
                    .transferSize,
                },
              ],
            },
          });
        break;
      default:
        deepMergeDevtools({
          metrics: {
            [metricName]: {
              value: data as number,
              score,
            },
          },
        });
        break;
    }
  },
});

export default useDevtools;
