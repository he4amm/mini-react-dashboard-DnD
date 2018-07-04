import React, { Component } from 'react';
import '../styles/components/Modal.css';

export default class Modal extends Component {
    render() {
        if (this.props.isOpen === false)
            return null

        return (
            <div>
                <div className="Modal">
                    <div className="Modal__header">
                        <span className="Modal__header--title">{this.props.title}</span>
                        <button className="Modal__header--btn" onClick={e => this.close(e)}></button>
                    </div>
                    {this.props.children}
                </div>
                <div className="backdrop" onClick={e => this.close(e)} />
            </div>
        )
    }

    close = (e) => {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}