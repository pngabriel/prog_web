import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import CadastroClientes from "./pages/CadastroClientes";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Produtos from "./pages/Produtos";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Pedidos from "./pages/Pedidos";
import Vendas from "./pages/Vendas";

const router = createBrowserRouter([
    { path: '/login', element: <Login/>},
    { path: '/', element: <Home/>},
    { path: '/clientes', element: <Clientes/>},
    { path: '/cadastro_clientes', element: <CadastroClientes/>},
    { path: '/estoque', element: <Estoque/>},
    { path: '/produtos', element: <Produtos/>},
    { path: '/sobre', element: <Sobre/>},
    { path: '/vendas', element: <Vendas/>},
    { path: '/pedidos', element: <Pedidos/>},
]);

export default router;