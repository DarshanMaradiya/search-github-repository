import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	makeStyles,
	Paper
} from "@material-ui/core"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import {
	searchRepository,
	cleanUpRepositoriesSlice
} from "../Actions/repositoriesActions"
import useLoader from "../CustomHooks/useLoader"
import SearchBar from "./SearchBar"
import PropTypes from "prop-types"
// import loaderGIF from "../Assets/Gifs/loaderGIF.gif"
import loaderGIF from "../Assets/Gifs/blue-loader.gif"
import { SET_REPOSITORIES } from "../Actions/types"
// import loaderGIF from "../Assets/Gifs/Line-Preloader.gif"

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%"
	},
	card: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "column",
		backgroundColor: "#001E31",
		width: "100%",
		color: "white"
	},
	cardHeader: {
		padding: theme.spacing(1, 2)
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "-webkit-fill-available"
	},
	searchBar: {
		width: 400,
		height: 50,
		backgroundColor: "#001E31"
	},
	button: {
		color: "white",
		backgroundColor: "#00203a",
		outline: "0.5px solid white"
	},
	pageno: {
		display: "flex",
		width: "20%",
		justifyContent: "center",
		alignItems: "center"
	},
	list: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		width: 400,
		height: "70vh",
		overflow: "hidden"
	},
	loaderGIF: {
		maxWidth: 400,
		maxHeight: "100%"
	},
	gridContainer: {
		// display: "flex",
		// flexDirection: "row",
		// justifyContent: "flex-start",
		// alignContent: "flex-start",
		width: "100%",
		height: 77
	},
	gridItem: {
		width: "100%",
		maxHeight: 77,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center"
	},
	paper: {
		// display: "flex",
		// justifyContent: "flex-start",
		padding: theme.spacing(2),
		color: "#45C2FF",
		width: "100%",
		backgroundColor: "#00203a",
		overflow: "hidden",
		textOverflow: "-o-ellipsis-lastline",
		display: "-webkit-box",
		WebkitLineClamp: 1,
		WebkitBoxOrient: "vertical",
		wordWrap: "break-word",
		wordBreak: "break-all",
		whiteSpace: "nowrap"
	},
	footer: {
		display: "flex",
		justifyContent: "space-between"
	},
	link: {
		textDecoration: "none",
		color: "#45C2FF",
		"&:hover": {
			textDecoration: "underline"
		}
	}
}))

const Welcome = (props) => {
	const dispatch = useDispatch()
	const classes = useStyles()

	const [searchKeyword, setSearchKeyword] = useState("") // search keyword
	const [currentPage, setCurrentPage] = useState() // current page content
	const [current_page_no, setCurrent_page_no] = useState(1) // current page no
	const [next_page_no, setNext_page_no] = useState(1)

	const per_page = 10
	const [loading, response, error, getRepos] = useLoader(
		searchRepository(searchKeyword, per_page, next_page_no, dispatch)
	)

	const searchResults = props.repositories.search_results
	const loaderGif = (
		<div>
			<img
				src={loaderGIF}
				className={classes.loaderGIF}
				alt='Loading...'
			/>
			<center>Added Extra 5 sec loading time to clearly see it</center>
		</div>
	)

	useEffect(() => {
		if (current_page_no - 1 < searchResults.length) {
			setCurrentPage(
				<Grid container className={classes.gridContainer}>
					{searchResults[current_page_no - 1].map((result) => (
						<Grid
							item={true}
							xs={11}
							key={result.id}
							className={classes.gridItem}
						>
							<Paper className={classes.paper}>
								<a
									href={result.owner.html_url}
									className={classes.link}
								>
									{result.owner.login}
								</a>
								{" / "}
								<a
									href={result.html_url}
									className={classes.link}
								>
									<b>{result.name}</b>
								</a>
							</Paper>
						</Grid>
					))}
				</Grid>
			)
		} else {
			setCurrentPage(loading && loaderGif)
		}
	}, [current_page_no, loading])

	useEffect(() => {
		if (searchKeyword != "" && next_page_no == 1) {
			getRepos()
			setNext_page_no(next_page_no + 1)
		}
	}, [searchKeyword, next_page_no])

	const onChange = (value) => {
		// setSearchKeyword(value)
	}

	const onRequestSearch = (value) => {
		props.cleanUpRepositoriesSlice()
		setCurrent_page_no(1)
		setNext_page_no(1)
		setSearchKeyword(value)
	}

	const gotoPrevPage = () => {
		setCurrent_page_no(current_page_no - 1)
	}

	const gotoNextPage = () => {
		if (current_page_no === searchResults.length && !loading) {
			getRepos()
			setNext_page_no(next_page_no + 1)
		}
		setCurrent_page_no(current_page_no + 1)
	}

	return (
		<div className={classes.container}>
			<Card className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={"Search Github Repository"}
					subheader={""}
				/>
				<Divider />

				<CardContent className={classes.cardContent}>
					<div
						className={classNames("form-group", classes.searchBar)}
					>
						<SearchBar
							onChange={onChange}
							onRequestSearch={onRequestSearch}
							className='form-control form-control-lg '
							style={{
								margin: "0 auto",
								maxWidth: 800
							}}
						/>
					</div>
					<div className={`form-group ${classes.list}`}>
						{currentPage}
					</div>
					<div className={classes.footer}>
						<Button
							onClick={gotoPrevPage}
							className={classes.button}
							disabled={current_page_no === 1}
						>
							Prev Page
						</Button>
						<span className={classes.pageno}>
							{current_page_no}
						</span>
						<Button
							onClick={gotoNextPage}
							className={classes.button}
							disabled={
								(searchKeyword == "" &&
									searchResults.length == 0) ||
								current_page_no >= searchResults.length + 1 ||
								(current_page_no == searchResults.length &&
									searchResults.length > 0 &&
									searchResults[searchResults.length - 1]
										.length != per_page)
							}
						>
							Next Page
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

Welcome.propTypes = {
	searchRepository: PropTypes.func.isRequired,
	repositories: PropTypes.object.isRequired,
	cleanUpRepositoriesSlice: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	errors: state.errors,
	repositories: state.repositories
})

export default connect(mapStateToProps, {
	searchRepository,
	cleanUpRepositoriesSlice
})(Welcome)
