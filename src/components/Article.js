import React, { Component } from 'react'
//очень перегруженный компонент вышел. Стоит вынести CommentList отдельно
class Article extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false,
			isCommentsVisible: false,
            obj: { foo: 'bar' }
        }
    }

    render() {
        const { article } = this.props;
        const body = this.state.isOpen ? <p>{article.text}</p> : null;
	//всегда страшно, когда вижу такую вложенность - знак, что стоит дробить эту логику
		if (this.state.isOpen) {
			if (this.state.isCommentsVisible) {
				const commentsItems = article.comments.map(comment => <li key = {comment.id}><i>{comment.user}</i>: {comment.text}</li>)
				return (
					<section>
						<h3 onClick = {this.handleClick}>{article.title}</h3>
						{body}
						<div onClick = {this.onHideCommentsClick}>hide</div>
						<ul>{commentsItems}</ul>
					</section>
				);
			} else {
				return (
					<section>
						<h3 onClick = {this.handleClick}>{article.title}</h3>
						{body}
						<div onClick = {this.onShowCommentsClick}>show</div>
					</section>
				);
			}
		} else {
			return (
				<section>
					<h3 onClick = {this.handleClick}>{article.title}</h3>
					{body}
				</section>
			);
		}
    }
	
	isReopenFullComments() {
		return true;
	}

    handleClick = ev => {
        this.setState({
            isOpen: !this.state.isOpen,
			isCommentsVisible: this.isReopenFullComments() ? this.state.isCommentsVisible : false
        });
    }
	//а вот эти два метода можно заменить одним toggleOpen
    onHideCommentsClick = ev => {
        this.setState({
            isCommentsVisible: false
        });
    }

    onShowCommentsClick = ev => {
        this.setState({
            isCommentsVisible: true
        });
    }
}

export default Article
