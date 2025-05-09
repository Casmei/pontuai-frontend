/* tslint:disable */
/* eslint-disable */
/**
 * Pontuaí
 * The Pontuaí API experience :)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateRewardResponse
 */
export interface CreateRewardResponse {
    /**
     * The unique identifier of the reward
     * @type {string}
     * @memberof CreateRewardResponse
     */
    id: string;
    /**
     * The name of the reward
     * @type {string}
     * @memberof CreateRewardResponse
     */
    name: string;
    /**
     * The description of the reward
     * @type {string}
     * @memberof CreateRewardResponse
     */
    description: string;
    /**
     * The points needed to redeem the reward
     * @type {number}
     * @memberof CreateRewardResponse
     */
    pointValue: number;
    /**
     * Id to identify which tenant the reward belongs to 
     * @type {string}
     * @memberof CreateRewardResponse
     */
    tenantId: string;
}

/**
 * Check if a given object implements the CreateRewardResponse interface.
 */
export function instanceOfCreateRewardResponse(value: object): value is CreateRewardResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('pointValue' in value) || value['pointValue'] === undefined) return false;
    if (!('tenantId' in value) || value['tenantId'] === undefined) return false;
    return true;
}

export function CreateRewardResponseFromJSON(json: any): CreateRewardResponse {
    return CreateRewardResponseFromJSONTyped(json, false);
}

export function CreateRewardResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateRewardResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'description': json['description'],
        'pointValue': json['point_value'],
        'tenantId': json['tenant_id'],
    };
}

export function CreateRewardResponseToJSON(json: any): CreateRewardResponse {
    return CreateRewardResponseToJSONTyped(json, false);
}

export function CreateRewardResponseToJSONTyped(value?: CreateRewardResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'description': value['description'],
        'point_value': value['pointValue'],
        'tenant_id': value['tenantId'],
    };
}

