const PageOverlay = (props) => {
    return <div className={`page-overlay ${props.activeState ? 'active' : ''}`}></div>
}

export default PageOverlay;