import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import Paginate from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import CustomChipInput from "./CustomChipInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(
        getPostsBySearch({
          search,
          tags: tags.join(","),
        })
      );
      history(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history("/");
    }
  };
  useEffect(() => {
    if (!searchQuery) {
      dispatch(getPosts(page));
    }
  }, [currentId, dispatch, page, searchQuery]);


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const [tags, setTags] = useState([]);
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <CustomChipInput
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
              />

              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />

            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
