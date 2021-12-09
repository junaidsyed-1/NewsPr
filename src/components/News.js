import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country : 'in',
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        category : PropTypes.string
    }

    constructor(){
        super();
        this.state ={
            articles : [],
            page : 1,
            loading : false
        }
    }

    async Update(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf08eebfde24362b769bfcd98b44e5a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles : parsedData.articles , 
            totalResults : parsedData.totalResults,
            loading:false
        })

    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf08eebfde24362b769bfcd98b44e5a&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true })
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles : parsedData.articles , 
        //     totalResults : parsedData.totalResults,
        //     loading:false
        // })
        this.Update();
    }


    handlePrv = async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf08eebfde24362b769bfcd98b44e5a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true })
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData);

        // this.setState({
        //     articles : parsedData.articles,
        //     page : this.state.page - 1,
        //     loading:false
        // })
        await this.setState({page : this.state.page - 1})
        this.Update();
    }

    handleNxt = async ()=>{
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bf08eebfde24362b769bfcd98b44e5a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true })
            // let data = await fetch(url)
            // let parsedData = await data.json()
            // console.log(parsedData);
            // this.setState({
            //     articles : parsedData.articles,
            //     page : this.state.page + 1,
            //     loading:false
            // })
            await this.setState({page : this.state.page + 1})
            this.Update();
        }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">Newsjar - Daily Dose of News</h1>
                {this.state.loading &&  <Spinner/>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((ele)=>{
                    return <div className="col-md-4 my-3" key={ele.url}>
                    <NewsItem name={ele.source.name? ele.source.name : "Unknown"} author={ele.author? ele.author : "Unknown"} publishedAt={ele.publishedAt} title={ele.title ? ele.title :""} description={ele.description ? ele.description : ""} imageUrl={ele.urlToImage } newsUrl={ele.url}/>
                </div>

                 })}
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <=1} type="button" className="btn btn-success" onClick={this.handlePrv}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNxt}>Next &rarr;</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default News
