import React from "react";
import Util from "../../utils/util";
import Table from "../../components/Table";
import useTableData from "../../utils/tableData";
const PartnersInfo = () => {
  const { format_currency } = Util();
  const { withdrawalsColumn } = useTableData();
  return (
    <div className="partnership-info-container">
      <div className="top-container">
        <h1 className="title">partnership summary</h1>
        <div className="summary-container">
          <div className="info-container">
            <span className="info-data">1</span>
            <span className="info-key">referrals</span>
          </div>
          <div className="info-container">
            <span className="info-data">1</span>
            <span className="info-key">premium</span>
          </div>
          <div className="info-container">
            <span className="info-data">{format_currency(25)}</span>
            <span className="info-key">Earnings</span>
          </div>
          <div className="info-container">
            <span className="info-data">{format_currency(15)}</span>
            <span className="info-key">Balance</span>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <h1 className="title">Withdrawal History</h1>
        <Table columns={withdrawalsColumn} rows={[]} />
      </div>
    </div>
  );
};

export default PartnersInfo;
