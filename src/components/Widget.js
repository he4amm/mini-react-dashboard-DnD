import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from '../data.json';
import '../styles/components/Widget.css';

export default class Widget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditWidgetOpen: false,
            isSettingsDropdownOpen: false,
            isHoursModeDropdownOpen: false,
            hoursMode: 'weekly',
            numOfUsers: this.props.widget.numOfUsers,
            orderUsers: this.props.widget.orderUsers
        };
    };

    componentDidMount() {
        setTimeout(() => {
            let initialDropoff = this.props.firstDropoff;
            this.props.actions.editWidget({
                ...this.props.widget,
                top: initialDropoff.offsetTop,
                left: initialDropoff.offsetLeft,
                width: initialDropoff.offsetWidth,
                height: initialDropoff.offsetHeight
            })
        }, 0);
    }

    render() {
        const hoursMode = ['daily', 'weekly', 'monthly'];
        const orderMode = ['DESC', 'ASC'];

        return (
            <div className="Widget" 
                style={{
                    top: this.props.widget.top, 
                    left: this.props.widget.left,
                    width: this.props.widget.width,
                    minHeight: this.props.widget.height
                }}
                draggable="true"
                onDragStart={(event) => this.props.handleDragStart(event, this.props.widget)}>
                {!this.state.isEditWidgetOpen ? 
                <div className="Widget-container">
                    <div className="Widget-header">
                        <div className="Widget-header__title">{this.props.widget.title}</div>
                        <div className="Widget-header__actions">
                            <div className={this.state.isHoursModeDropdownOpen ? 'dropdown open' : 'dropdown'}>
                                <button className="hours-dropdown-btn" onClick={e => this.openHoursModeDropdown(e)}>
                                    {this.state.hoursMode}
                                </button>
                                <ul className="dropdown-content" ref="hoursModeDropdown" tabIndex="0" onBlur={() => this.closeHoursModeDropdown()}>
                                    {hoursMode.map((mode, index) => 
                                        <li key={index} className={this.state.hoursMode === mode ? 'active' : ''} onClick={() => this.handleHoursMode(mode)}>{mode}</li>
                                    )}
                                </ul>
                            </div>
                            <div className={this.state.isSettingsDropdownOpen ? 'dropdown open' : 'dropdown'}>
                                <button className="dropdown-btn" onClick={e => this.openSettingsDropdown(e)}></button>
                                <ul className="dropdown-content" ref="settingsDropdown" tabIndex="0" onBlur={() => this.closeSettingsDropdown()}>
                                    <li onClick={() => this.handleEditWidget(true)}>Edit Widget</li>
                                    <li onClick={() => this.handleDeleteWidget(this.props.widget.id)}>Delete Widget</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Widget-body">
                        <div className="Users">
                            {this.sortedUserArray(data.users).slice(0, this.state.numOfUsers).map((user, index) => 
                                <div className="Users-item" key={user.id}>
                                    <div className="Users-item__details">
                                        <div className="Users-item__details--avatar">
                                            <img src={require(`../assets/img/user_avatar_${user.id}.png`)} alt=""/>
                                        </div>
                                        <div className="Users-item__details--name">{user.name} {user.lastname}</div>
                                    </div>
                                    <div className="Users-item__values">
                                        <div className="Users-item__values--bar">
                                            <span className="Users-item__values--bar-value"
                                                style={{ width: `${this.handleHoursPercentage(user.id)}%`}}></span>
                                        </div>
                                        <div className="Users-item__values--precentage">
                                            {this.handleHoursPercentage(user.id)}%
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div> :
                <div className="Widget-container">
                    <div className="Widget-header">
                        <div className="Widget-header__title">Edit {this.props.widget.title}</div>
                    </div>
                    <div className="Widget-body">
                        <div className="form-group">
                            <label>Number of users</label>
                            <select className="form-control"
                                value={this.state.numOfUsers}
                                onChange={value => this.handleEditNumOfUsers(value)}>
                                {Array.from(Array(5).keys()).map((item, index) => 
                                    <option key={index} value={++index}>{index}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Activity</label>
                            <div className="radio">
                                {orderMode.map((mode, index) => 
                                    <label key={index}>
                                        <input type="radio" name="activity"
                                            value={mode}
                                            checked={this.state.orderUsers === mode}
                                            onChange={() => this.handleEditOrderUsers(mode)} />
                                            {mode==='DESC'? 'Highest' : 'Lowest'}
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <select className="form-control">
                                <option value="0">Mobile Time</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <select className="form-control">
                                <option value="0">Weekly</option>
                            </select>
                        </div>

                        <div className="Widget-body__actions">
                            <button className="EditWidget__button--cancel" onClick={() => this.handleCancelWidget()}></button>
                            <button className="EditWidget__button--save" onClick={() => this.handleSaveWidget()}></button>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }

    handleEditOrderUsers = (mode) => {
        this.setState({ orderUsers: mode });
    }

    handleEditNumOfUsers = (e) => {
        this.setState({ numOfUsers: Number(e.target.value) });
    }

    handleCancelWidget = () => {
        this.setState({ 
            numOfUsers: this.props.widget.numOfUsers,
            orderUsers: this.props.widget.orderUsers
        });
        this.handleEditWidget(false);
    }

    handleSaveWidget = () => {
        this.props.actions.editWidget({
            ...this.props.widget,
            id: this.props.widget.id, 
            orderUsers: this.state.orderUsers,
            numOfUsers: this.state.numOfUsers
        });
        this.handleEditWidget(false);
    }

    sortedUserArray = (users) => {
        if (this.props.widget.orderUsers === 'ASC')
            return users.sort((a, b) => this.handleHoursPercentage(a.id) > this.handleHoursPercentage(b.id) ? 1 : (this.handleHoursPercentage(b.id) > this.handleHoursPercentage(a.id)) ? -1 : 0);
        else
            return users.sort((a, b) => this.handleHoursPercentage(a.id) > this.handleHoursPercentage(b.id) ? -1 : (this.handleHoursPercentage(b.id) > this.handleHoursPercentage(a.id)) ? 1 : 0)
    }

    handleHoursPercentage = (id) => {
        return Math.round(data[this.state.hoursMode][id]);
    }

    handleHoursMode = (mode) => {
        this.setState({ hoursMode: mode });
        this.closeHoursModeDropdown();
    }

    handleEditWidget = (open) => {
        this.setState({ isEditWidgetOpen: open });
        this.closeSettingsDropdown();
    }

    handleDeleteWidget = (id) => {
        this.props.actions.deleteWidget(id);
    }

    closeHoursModeDropdown = () => {
        this.setState({ isHoursModeDropdownOpen: false });
    }

    openHoursModeDropdown = (e) => {
        this.setState({ isHoursModeDropdownOpen: true });
        setTimeout(() => {
            ReactDOM.findDOMNode(this.refs.hoursModeDropdown).focus();
        }, 100);
    }

    closeSettingsDropdown = () => {
        this.setState({ isSettingsDropdownOpen: false });
    }

    openSettingsDropdown = (e) => {
        this.setState({ isSettingsDropdownOpen: true });
        setTimeout(() => {
            ReactDOM.findDOMNode(this.refs.settingsDropdown).focus();
        }, 100);
    }
}