// @flow

import { mutationWithClientMutationId, fromGlobalId } from "graphql-relay";
import { GraphQLNonNull, GraphQLBoolean, GraphQLID } from "graphql";
import { GraphQLTodoItem } from "../objects";
import { TodoItem } from "../../models";
import type { Context } from "../type";

type Payload = { todo: TodoItem };

export default mutationWithClientMutationId({
  name: "UpdateTodoItem",
  description: "Update a todo item.",
  inputFields: {
    todoId: { type: new GraphQLNonNull(GraphQLID) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) }
  },
  outputFields: {
    updatedTodo: {
      type: new GraphQLNonNull(GraphQLTodoItem),
      resolve: (payload: Payload): TodoItem => payload.todo
    }
  },
  mutateAndGetPayload: async (
    { todoId, completed },
    context: Context
  ): Promise<Payload> =>
    {
      const { id } = fromGlobalId(todoId);
      const todo = await TodoItem.gen(id, context.todoItemConnector);
      if (!todo) {
        throw new Error(`Could not find a todo with id ${id}.`);
      }
      await todo.update(completed);
      return { todo };
    }
});
