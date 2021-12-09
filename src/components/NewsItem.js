import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, publishedAt,author, name} = this.props
        return (
            <>
            <div>
                <div className="card">
                <span className={`position-absolute top-0 translate-middle badge rounded-pill bg-dark`} style={{zIndex:3, left: '90%'}}> {name} </span>
                <img src={!imageUrl ? "https://english.cdn.zeenews.com/sites/default/files/2021/12/07/993666-moon-hut.jpg" :     imageUrl} className="card-img-top" alt="..." style={{height : '150px'}}/>
                <div className="card-body">
                    <span style={{fontSize:'12px', color:'red'}}><b>Author</b>: {author},<b> Published At</b>: {new Date (publishedAt).toUTCString()}</span>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default NewsItem
