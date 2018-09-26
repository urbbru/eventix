import {JsonController, Get, Post, Body, HttpCode} from 'routing-controllers'
import Comment from './entity';

@JsonController()
export default class CommentController {

    @Get('/comments')
    allComments = async () => {
       const comments = await Comment.find()
       return { comments }
    }

    @Post('/comments')
    @HttpCode(201)
    createComment(
      @Body() comment: Comment
    ) {
      return comment.save()
    }

}