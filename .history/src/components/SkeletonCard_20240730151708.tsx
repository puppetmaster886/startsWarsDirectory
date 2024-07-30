import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";

const SkeletonCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title={<Skeleton variant="text" width="60%" />} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
