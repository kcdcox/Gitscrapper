/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { SelectOption } from "types";
import { MultiSelectButton, Checkbox } from "components/ui";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import styles from "./linesChangedGraph.module.scss";

enum Colors {
  Add = "#81E2BC",
  Remove = "#E56666",
  Total = "#82EEEE",
}

interface Props {
  data: any;
}

const LinesChangedGraph = ({ data }: Props) => {
  const [timeRange, setTimeRange] = useState("biMonthly");

  const graphTimeOptions: SelectOption[] = [
    { label: "Monthly", value: "monthly" },
    { label: "Bimonthly", value: "biMonthly" },
  ];

  const activeGraphData =
    timeRange === "biMonthly" ? data?.biMonthlyData : data?.monthlyData;

  const CustomTooltip = ({ payload, label }: any) => {
    return (
      <div className="tooltip">
        {label !== "" && (
          <h5 className="label">
            {`${label?.substring(0, 3)} 20${label?.substring(5, 7)}`}
          </h5>
        )}
        <p style={{ color: `${payload[1]?.color}` }}>
          {`Lines Added: ${payload[1]?.value}`}
        </p>
        <p style={{ color: `${payload[2]?.color}` }}>
          {`Lines Removed: ${payload[2]?.value}`}
        </p>
        <p style={{ color: `${payload[0]?.color}` }}>
          {`Total Lines Changed: ${payload[0]?.value}`}
        </p>
      </div>
    );
  };

  const renderLegend = () => {
    return (
      <div className={styles.legend}>
        <Checkbox name="linesAdded" />
      </div>
    );
  };

  return (
    <div id="linesChangedGraph" className={styles.LinesChangedGraph}>
      {renderLegend()}
      <h4 className={styles.graph__header}>
        Code Lines Added & Removed Over Time
      </h4>
      <div className={styles.graph__body}>
        <div className={styles.yAxis__label}>
          <h5 className={styles.graph__label}>Lines Changed</h5>
        </div>
        <ResponsiveContainer width="94%" height="90%">
          <AreaChart
            data={activeGraphData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Colors.Add} stopOpacity={0.8} />
                <stop offset="95%" stopColor={Colors.Add} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRemoved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Colors.Remove} stopOpacity={0.8} />
                <stop offset="95%" stopColor={Colors.Remove} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Colors.Total} stopOpacity={0.8} />
                <stop offset="95%" stopColor={Colors.Total} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" dx={40} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              cursor={{ stroke: "#C269FF", strokeWidth: 3 }}
              content={<CustomTooltip />}
              wrapperStyle={{
                zIndex: 1000,
                background: "#4E374ACC",
                padding: "10px 15px",
                border: "1px solid #96bdb5",
                borderRadius: "5px",
              }}
            />
            <Area
              type="monotone"
              dataKey="totalLines"
              stroke="#82EEEE"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            <Area
              type="monotone"
              dataKey="linesAdded"
              stroke="#81E2BC"
              fillOpacity={1}
              fill="url(#colorAdded)"
            />
            <Area
              type="monotone"
              dataKey="linesRemoved"
              stroke="#E56666"
              fillOpacity={1}
              fill="url(#colorRemoved)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.xAxis__label}>
        <MultiSelectButton
          name="Time-Range"
          size="small"
          value={timeRange}
          labels={graphTimeOptions}
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
