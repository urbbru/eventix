import { JsonController, Get } from 'routing-controllers'
import Comment from './entity';

@JsonController()
export default class CommentController {

    @Get('/comments')
    allComments = async () => {
       const comments = await Comment.find()
       return { comments }
    }

}