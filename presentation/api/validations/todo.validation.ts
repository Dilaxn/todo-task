// validation.ts
import * as Joi from "joi";

export const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    deadline: Joi.date().iso().required(),
    status: Joi.string(),
    priority: Joi.string(),
    order: Joi.number(),
});

export const updateTodoSchema = Joi.object({
    __v: Joi.number(),
    _id: Joi.string(),
    title: Joi.string(),
    deadline: Joi.date().iso(),
    status: Joi.string(),
    priority: Joi.string(),
    order: Joi.number(),
    createdAt: Joi.date().iso(),
    updatedAt: Joi.date().iso(),
});
