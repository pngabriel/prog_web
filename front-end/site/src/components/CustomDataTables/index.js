import React, { useState } from "react";
import DataTable from "react-data-table-component";

export default function CustomDataTables({
    columns,
    data,
    onRowClicked,
    noDataText,
    applyDataSaidaCheck = false,
    applyDataSaidaEntregaCheck = false,
    centerAlign = false,
    whiteBackground = false
}) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filtrar os dados com base na busca
    const filteredData = data.filter(row =>
        Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Ordenar os dados filtrados
    const sortedData = [...filteredData].sort((a, b) => b.id - a.id);

    const conditionalRowStyles = [
        {
            when: row =>
                row.situacao === "concluído" &&
                (
                    (!applyDataSaidaCheck || row.data_saida !== null) &&
                    (!applyDataSaidaEntregaCheck || row.data_saida_entrega !== null)
                ),
            style: {
                backgroundColor: "#28a745", // Verde do site
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: "#218838",
                    transform: "scale(1.02)",
                    cursor: "pointer",
                },
            },
        },
    ];

    const customStyles = {
        table: {
            style: {
                borderRadius: "10px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: whiteBackground ? "#fff" : "#f8f9fa",
                overflow: "hidden",
            },
        },
        rows: {
            style: {
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                    backgroundColor: "#e9ecef",
                    borderRadius: "10px",
                },
                height: "55px",
                fontWeight: "bold",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#28a745",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: centerAlign ? "center" : "left",
                justifyContent: centerAlign ? "center" : "flex-start",
                padding: "14px",
            },
        },
        cells: {
            style: {
                textAlign: centerAlign ? "center" : "left",
                justifyContent: centerAlign ? "center" : "flex-start",
                padding: "12px",
                fontSize: "14px",
                margin: 0,
                transition: "background-color 0.2s ease-in-out",
            },
        },
    };

    return (
        <div style={styles.wrapper}>
            {/* Campo de busca */}
            {/* <div style={styles.searchContainer}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div> */}
            <DataTable
                columns={columns}
                data={sortedData}
                pagination
                onRowClicked={onRowClicked}
                customStyles={customStyles}
                noDataComponent={<div style={styles.noDataText}>{noDataText}</div>}
                conditionalRowStyles={conditionalRowStyles}
            />
        </div>
    );
}

const styles = {
    wrapper: {
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        padding: "15px",
    },
    searchContainer: {
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
    },
    searchInput: {
        width: "100%",
        maxWidth: "400px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        outline: "none",
        transition: "border 0.3s ease-in-out",
    },
    noDataText: {
        padding: "20px",
        fontSize: "16px",
        color: "#777",
    },
};
