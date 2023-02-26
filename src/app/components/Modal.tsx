import 'bootstrap/dist/css/bootstrap.css'

function Modal({show = false, content = ''}) {
    const Element = () => {

        let className = 'modal fade'
        let style = {
            display: 'none'
        }
        if (show) {
            style.display = 'block'
            className = 'modal fade show'
        }

        return (
            <>
                <div className={className} style={style} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {content}
                        </div>
                    </div>
                </div>


                {show ? <div className="modal-backdrop fade show"></div> : null}
            </>
        )
    }

    return Element()
}

export default Modal
