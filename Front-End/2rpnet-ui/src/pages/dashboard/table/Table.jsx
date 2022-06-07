 import "../../../assets/css/pages/table.scss";
 import Table from "@mui/material/Table";
 import TableBody from "@mui/material/TableBody";
 import TableCell from "@mui/material/TableCell";
 import TableContainer from "@mui/material/TableContainer";
 import TableHead from "@mui/material/TableHead";
 import TableRow from "@mui/material/TableRow";
 import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Pesquisador",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Marcos Artes",
      date: "2 de Fevereiro",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Mega",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Gsutavo Borges",
      date: "6 de Fevereiro",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Assistente de Emails",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Erick Souza",
      date: "26 de Março",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Email para Pedro",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Isa Medeiros",
      date: "1 de Abril",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Ver cotação do dólar",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "José Benedito",
      date: "14 de Abril",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="p tableCell">ID</TableCell>
            <TableCell className="p tableCell">Nome</TableCell>
            <TableCell className="p tableCell">Criador</TableCell>
            <TableCell className="p tableCell">Data</TableCell>
            <TableCell className="p tableCell">Execuções</TableCell>
            <TableCell className="p tableCell">Descrição</TableCell>
            <TableCell className="p tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="p tableCell">{row.customer}</TableCell>
              <TableCell className="p tableCell">{row.date}</TableCell>
              <TableCell className="p tableCell">{row.amount}</TableCell>
              <TableCell className="p tableCell">{row.method}</TableCell>
              <TableCell className="p tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;