import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedbackStats } from "@/lib/api";

interface SentimentCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const SentimentCard = ({
  title,
  value,
  description,
  icon,
  colorClass,
}: SentimentCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${colorClass}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}%</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SentimentCard;
