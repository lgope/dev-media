import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';

// Material UI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
// import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};
export class Scream extends Component {
  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile Image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          {/* {deleteButton} */}
          {/* <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography> */}
          <Typography variant='body1'>{body}</Typography>
          {/* <LikeButton screamId={screamId} /> */}
          <span>{likeCount} Likes</span>
          {/* <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton> */}
          <span>{commentCount} comments</span>
          {/* <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          /> */}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
