// import Sidebar from "./sidebar/Sidebar";
import Navbar from "../../components/menu/Navbar";
import "../../assets/css/pages/dashboard.scss";
import Widget from "../dashboard/widget/widget";
import Featured from "../dashboard/featured/featured";
import Chart from "./chart/Chart";
import Table from "./table/Table";

const Dashboard = () => {
  return (
    <div className="home">
      {/* <Sidebar /> */}
        <Navbar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;