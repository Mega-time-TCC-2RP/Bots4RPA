import "../../../assets/css/pages/featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";

const Featured = ({value}) => {
        useEffect(() => {
                if(value === undefined){
                        value = 0;
                }
        }, [])
        return (
                <div className="featured">
                        <div className="top">
                                <h1 className="h5 title">Sucesso do Assistente(%)</h1>
                                <MoreVertIcon fontSize="small" />
                        </div>
                        <div className="bottom">
                                <div className="featuredChart">
                                        <CircularProgressbar value={value} text={value + "%"} strokeWidth={5} />
                                </div>
                                {/* <p className="h4 title">Taxa de Sucesso de Assistentes</p>
                                <p className="p amount"></p>
                                <p className="desc"> */}
                                {/* </p> */}
                                {/* <div className="summary">
                                        <div className="item">
                                                <div className="itemTitle">Target</div>
                                                <div className="itemResult negative">
                                                        <KeyboardArrowDownIcon fontSize="small" />
                                                        <div className="resultAmount">$12.4k</div>
                                                </div>
                                        </div>
                                        <div className="item">
                                                <div className="itemTitle">Última Semana</div>
                                                <div className="itemResult positive">
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                        <div className="resultAmount">$12.4k</div>
                                                </div>
                                        </div>
                                        <div className="item">
                                                <div className="itemTitle">Último Mês</div>
                                                <div className="itemResult positive">
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                                        <div className="resultAmount">$12.4k</div>
                                                </div>
                                        </div>
                                </div> */}
                        </div>
                </div>
        );
};

export default Featured;