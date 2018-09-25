import {JsonController, Get, Post, Put, Body, Param, HttpCode, NotFoundError} from 'routing-controllers'
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

    @Put('/comments/:id')
    async updateComment(
      @Param('id') id: number,
      @Body() update: Partial<Comment>
    ) {
      const comment = await Comment.findOne(id)
      if(!comment) throw new NotFoundError('Comment not found djais')

      return Comment.merge(comment, update).save()
    }

}