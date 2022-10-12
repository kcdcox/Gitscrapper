import React, { useState } from "react";
import { SelectOption } from "types";
import { Select } from "components/ui";
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./linesChangedGraph.module.scss";

interface Props {
  data: any;
}

const LinesChangedGraph = ({ data }: Props) => {
  const [timeRange, setTimeRange] = useState("biMonthly");

  const graphTimeOptions: SelectOption[] = [
    { label: "(Bi-Monthly)", value: "biMonthly" },
    { label: "(Monthly)", value: "monthly" },
  ];

  const activeGraphData =
    timeRange === "biMonthly" ? data?.biMonthlyData : data?.monthlyData;

  return (
    <div className={styles.LinesChangedGraph}>
      <h4 className={styles.graph__header}>
        Code Lines Added & Removed Over Time
      </h4>
      <div className={styles.graph__body}>
        <div className={styles.yAxis__label}>
          <h5 className={styles.graph__label}>Lines Changed</h5>
        </div>
        <ResponsiveContainer width="94%" height="90%">
          <AreaChart
            data={activeGraphData ?? []}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#81E2BC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#81E2BC" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRemoved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E56666" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E56666" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82EEEE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82EEEE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" dx={40} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalLines"
              stroke="#82EEEE"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            <Area
              type="monotone"
              dataKey="linesRemoved"
              stroke="#E56666"
              fillOpacity={1}
              fill="url(#colorRemoved)"
            />
            <Area
              type="monotone"
              dataKey="linesAdded"
              stroke="#81E2BC"
              fillOpacity={1}
              fill="url(#colorAdded)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.xAxis__label}>
        <h5 className={styles.graph__label}>Time</h5>
        <Select
          name="Time-Range"
          value={timeRange}
          options={graphTimeOptions}
          onChange={(val: string) => setTimeRange(val)}
        />
      </div>
    </div>
  );
};

export default LinesChangedGraph;

const dummy = [
  {
    name: "Jul '22",
    linesAdded: 0,
    linesRemoved: 0,
    totalLines: 0,
  },
  {
    name: "Jul '22",
    linesAdded: 617,
    linesRemoved: 18,
    totalLines: 635,
  },
  {
    name: "Aug '22",
    linesAdded: 539,
    linesRemoved: 244,
    totalLines: 783,
  },
  {
    name: "Aug '22",
    linesAdded: 878,
    linesRemoved: 696,
    totalLines: 1574,
  },
  {
    name: "Sep '22",
    linesAdded: 409,
    linesRemoved: 110,
    totalLines: 519,
  },
  {
    name: "",
    linesAdded: 651,
    linesRemoved: 245,
    totalLines: 896,
  },
];
