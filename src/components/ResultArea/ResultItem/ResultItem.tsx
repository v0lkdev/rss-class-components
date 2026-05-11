import { Component } from 'react';
import './ResultItem.css';

type ResultItemProps = {
  title: string;
};

export default class ResultItem extends Component<ResultItemProps> {
  render() {
    return (
      <li className="item-title" aria-label="title">
        {this.props.title}
      </li>
    );
  }
}
