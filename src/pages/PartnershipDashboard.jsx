import "../styles/partners.css";
import PartnersTopbar from "../components/partners/PartnersTopbar";
import PartnersInfo from "../components/partners/PartnersInfo";
import Table from "../components/Table";
import useTableData from "../utils/tableData";

const PartnershipDashboard = () => {
  const { withdrawalsColumn } = useTableData();
  return (
    <div className="main-container">
      <PartnersTopbar />
      <div className="partnership-container">
        <div className="partnership-left-container">
          <PartnersInfo />
        </div>
        <div className="partnership-right-container">
          {" "}
          <h1 className="title">Direct Downlines</h1>
          <Table columns={withdrawalsColumn} rows={[]} />
        </div>
      </div>
    </div>
  );
};

export default PartnershipDashboard;
