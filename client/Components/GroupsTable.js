import React from "react";

function GroupTable({ groupId, color }) {
  return (
    <div>
      <p>Group:{color}</p>
      <p>Group ID:{groupId}</p>
    </div>
  );
}
export default GroupTable;
