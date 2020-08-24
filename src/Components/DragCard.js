import React from "react";
import { Card } from "react-bootstrap";
import DropzoneForFailure from "./DropzoneForFailureAnalysis";

export default function DragCard({ title, fileType, callback, setFlag }) {
  return (
    <Card style={{ width: "18rem", height: "300px" }}>
      <Card.Body>
        <Card.Title className="font-weight-bold">{title}</Card.Title>

        <DropzoneForFailure
          fileType={fileType}
          callback={callback}
          setFlag={setFlag}
        />
      </Card.Body>
    </Card>
  );
}
