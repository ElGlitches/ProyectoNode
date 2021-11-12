const exelGenerator = (productos, name, res) => {
    const xl = require('excel4node');

    productos = productos.map((producto) => {
        let id = producto._id.toString();
        delete producto._id;
        return {
            id,
            ...producto,
        };
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("inventario");

    for (let i = 1; i <= productos.length; i++) {
        for (let j = 1; j <= Object.values(productos[0]).length; j++) {
            let data = Object.values(productos[i - 1])[j - 1];
            if (typeof data === "string") {
                ws.cell(i, j).string(data);
            } else {
                ws.cell(i, j).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res);
};

module.exports.productosUtils = {
    exelGenerator
};