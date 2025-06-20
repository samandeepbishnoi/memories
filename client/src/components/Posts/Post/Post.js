import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [likes, setLikes] = useState(post?.likes || []);
  const userId = user?.result?.googleId || user?.result?._id;
  const isPostCreator = userId === post?.creator;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLike = () => {
    dispatch(likePost(post._id));

    if (likes.includes(userId)) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.includes(userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="div"
        className={classes.cardActionArea}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {isPostCreator && (
          <div className={classes.overlay2}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {isPostCreator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp;Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
