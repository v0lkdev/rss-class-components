import { Component } from 'react';
import './ResultItemDescription.css';

type ResultItemDescriptionProps = {
  author: string;
  publishYear: number;
  editionCount: number;
};

export default class ResultItemDescription extends Component<ResultItemDescriptionProps> {
  render() {
    return (
      <li>
        Author - <span className="description-data">{this.props.author}</span>;
        First publish year -{' '}
        <span className="description-data">{this.props.publishYear}</span>;
        Edition count -{' '}
        <span className="description-data">{this.props.editionCount}</span>
      </li>
    );
  }
}
