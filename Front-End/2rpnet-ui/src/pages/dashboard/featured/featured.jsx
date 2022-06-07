import "../../../assets/css/pages/featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
        return (
                <div className="featured">
                        <div className="top">
                                <h1 className="h5 title">Sucesso de Assistentes(%)</h1>
                                <MoreVertIcon fontSize="small" />
                        </div>
                        <div className="bottom">
                                <div className="featuredChart">
                                        <CircularProgressbar value={89} text={"89%"} strokeWidth={5} />
                                </div>
                                <p className="h4 title">Taxa de Sucesso de Assistentes</p>
                                <p className="p amount"></p>
                                <p className="desc">
                                </p>
                                <div className="summary">
                                        <div className="item">
                                                <div className="p itemTitle">Perda</div>
                                                <div className="itemResult negative">
                                                        <KeyboardArrowDownIcon fontSize="small" />
                                                        <div className="p resultAmount">4.3%</div>
                                                </div>
                                        </div>
                                        <div className="item">
                                                <div className="p itemTitle">Última Semana</div>
                                                <div className="itemResult positive">
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                        <div className="p resultAmount">12.4%</div>
                                                </div>
                                        </div>
                                        <div className="item">
                                                <div className="p itemTitle">Último Mês</div>
                                                <div className="itemResult positive">
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                        <div className="p resultAmount">20.2%</div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Featured;