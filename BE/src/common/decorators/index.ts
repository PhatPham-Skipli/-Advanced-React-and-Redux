import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min
} from 'class-validator';

export const StringRequired = (name: string) =>
    applyDecorators(
        ApiProperty({ required: true }),
        IsString({ message: `${name} must be a string` }),
        IsNotEmpty({ message: `${name} must not be empty` })
    );

export const StringNotRequired = (name: string) =>
    applyDecorators(
        ApiProperty({ required: false }),
        IsString({ message: `${name} must be a string` }),
        IsOptional()
    );

export const NumberRequired = (name: string, min?: number, max?: number) =>
    applyDecorators(
        ApiProperty({ required: true }),
        Type(() => Number),
        IsNumber({}, { message: `${name} must be a number` }),
        IsNotEmpty({ message: `${name} must not be empty` }),
        ...(min !== undefined
            ? [
                  Min(min, {
                      message: `${name} must be greater than or equal to ${min}`
                  })
              ]
            : []),
        ...(max !== undefined
            ? [
                  Max(max, {
                      message: `${name} must be less than or equal to ${max}`
                  })
              ]
            : [])
    );

export const NumberNotRequired = (name: string) =>
    applyDecorators(
        ApiProperty({ required: false }),
        Type(() => Number),
        IsNumber({}, { message: `${name} must be a number` }),
        IsOptional()
    );

export const BooleanRequired = (name: string) =>
    applyDecorators(
        ApiProperty({ required: true }),
        Type(() => Boolean),
        IsBoolean({ message: `${name} must be a boolean` }),
        IsNotEmpty({ message: `${name} must not be empty` })
    );

export const BooleanNotRequired = (name: string) =>
    applyDecorators(
        ApiProperty({ required: false }),
        Type(() => Boolean),
        IsBoolean({ message: `${name} must be a boolean` }),
        IsOptional()
    );

export const EnumRequired = (name: string, enumType: object) =>
    applyDecorators(
        ApiProperty({ required: true, enum: enumType }),
        IsEnum(enumType, {
            message: `${name} must be one of: ${Object.values(enumType).join(', ')}`
        }),
        IsNotEmpty({ message: `${name} must not be empty` })
    );

export const EnumNotRequired = (name: string, enumType: object) =>
    applyDecorators(
        ApiProperty({ required: false, enum: enumType }),
        IsEnum(enumType, {
            message: `${name} must be one of: ${Object.values(enumType).join(', ')}`
        }),
        IsOptional()
    );

export const ArrayRequired = (
    name: string,
    type: any,
    minSize?: number,
    maxSize?: number
) =>
    applyDecorators(
        ApiProperty({
            required: true,
            type: 'array',
            isArray: true,
            items: { type: type.name }
        }),
        IsArray({ message: `${name} must be an array` }),
        ArrayNotEmpty({ message: `${name} must not be empty` }),
        Type(() => type),
        ...(minSize !== undefined
            ? [
                  ArrayMinSize(minSize, {
                      message: `${name} must have at least ${minSize} items`
                  })
              ]
            : []),
        ...(maxSize !== undefined
            ? [
                  ArrayMaxSize(maxSize, {
                      message: `${name} must have at most ${maxSize} items`
                  })
              ]
            : [])
    );

export const ArrayNotRequired = (
    name: string,
    type: any,
    minSize?: number,
    maxSize?: number
) =>
    applyDecorators(
        ApiProperty({
            required: false,
            type: 'array',
            isArray: true,
            items: { type: type.name }
        }),
        IsArray({ message: `${name} must be an array` }),
        Type(() => type),
        ...(minSize !== undefined
            ? [
                  ArrayMinSize(minSize, {
                      message: `${name} must have at least ${minSize} items`
                  })
              ]
            : []),
        ...(maxSize !== undefined
            ? [
                  ArrayMaxSize(maxSize, {
                      message: `${name} must have at most ${maxSize} items`
                  })
              ]
            : []),
        IsOptional()
    );
