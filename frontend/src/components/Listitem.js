import React from 'react';
export default() =>  {
        return <li>
        <input type="checkbox" data-role="none" defaultChecked={this.props.item.check}/>
        {this.props.item.text}
    </li>;
}

