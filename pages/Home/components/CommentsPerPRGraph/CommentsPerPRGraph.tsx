import React, { useState } from "react";
import { useEffect } from "react";
import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
} from "recharts";
import styles from "./linesChangedGraph.module.scss";

interface Props {
  data: any[];
}

const CommentsPerPRGraph = ({ data }: Props) => {
  const [graphData, setGraphData] = useState<any[]>();

  useEffect(() => {
    getGraphData();
  }, []);

  const getGraphData = async () => {
    const response = await fetch("/api/gitscrape/getLinesChangedGraph", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGraphData(data.data);
    console.log(data);
  };

  return (
    <div className={styles.lineChart}>
      <AreaChart
        width={1530}
        height={450}
        data={data}
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
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
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
        <Area
          type="monotone"
          dataKey="totalLines"
          stroke="#82EEEE"
          fillOpacity={1}
          fill="url(#colorTotal)"
        />
      </AreaChart>
    </div>
  );
};

export default CommentsPerPRGraph;
