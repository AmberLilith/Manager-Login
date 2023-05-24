const LoginPagination = ({ updateActivePage, updateUrl, totalPages }) => {
    let items = [];
    for (let number = 0; number < totalPages; number++) {
        items.push(number);
    }

    const setActiveItem = (id) => {
        for (let number = 0; number < items.length; number++) {
            document.getElementById('item_' + number).classList.remove('active');
        }
        document.getElementById(id).classList.add('active');
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {items.map(item => (
                    <li key={"item_" + item} id={"item_" + item} className="page-item"><a className="page-link" onClick={() => [updateActivePage(item), updateUrl(item), setActiveItem("item_" + item)]} href="#">{item} </a></li>
                ))}

            </ul>
        </nav>
    )
}

export default LoginPagination;