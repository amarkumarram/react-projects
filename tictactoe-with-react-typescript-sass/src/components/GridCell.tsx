export function GridCell(props: any): any {
    const { clickHandler, cellNumber } = props;

    return (
        <div className="gridCell gridCellValue" onClick={(e) => clickHandler(e)} data-cell={cellNumber} ></div>
    )
}