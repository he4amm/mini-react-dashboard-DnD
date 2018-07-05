import React, { Component } from 'react';
import Modal from './Modal';
import '../styles/components/AddWidget.css';

export default class AddWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
    };

    render() {
        return (
            <div className="AddWidget">
                <button className="AddWidget__button--add" onClick={() => this.openModal()}>Add Widget</button>

                <Modal 
                    title="Add a widget"
                    isOpen={this.state.isModalOpen} 
                    onClose={() => this.closeModal()}>
                    <div className="Modal-content">
                        <div className="Modal-content__sidebar">
                            <span className="Modal-content__sidebar--list">My Widget</span>
                        </div>
                        <div className="Modal-content__body">
                            <div className="Modal-content__body--widget">
                                <div className="Modal-content__body--widget-img">
                                    {/* IMAGE HERE */}
                                </div>
                                <div className="Modal-content__body--widget-desc">
                                    <span className="title">Users worked more than required</span>
                                    <span className="desc">Users who worked more or less than their minimum hours required in daily, weekly and monthly.</span>
                                    <div className="tags">
                                        <span>Variables:</span>
                                        <span className="tag">users</span><span className="tag">websites</span><span className="tag">apps</span><span className="tag">time</span><span className="tag">date</span>
                                    </div>
                                </div>
                                <div className="Modal-content__body--widget-action">
                                    {this.props.widgets.length 
                                        ? <button className="AddWidget__button--delete" onClick={() => this.handleRemoveWidget(this.props.widgets[0].id)}>Delete Widget</button>
                                        : <button className="AddWidget__button--add" onClick={() => this.handleAddWidget()}>Add Widget</button>
                                    }
                                </div>
                            </div>

                            <div className="Modal-content__body--actions">
                                <button className="AddWidget__button--save" onClick={() => this.saveWidgets()}></button>
                                <button className="AddWidget__button--cancel" onClick={() => this.closeModal()}></button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    handleRemoveWidget = (id) => {
        this.props.actions.deleteWidget(id);
    }

    handleAddWidget = () => {
        this.props.actions.addWidget();
    }

    openModal = () => {
        this.setState({ isModalOpen: true })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    saveWidgets = () => {
        // actions to save widgets state
        this.setState({ isModalOpen: false })
    }
}