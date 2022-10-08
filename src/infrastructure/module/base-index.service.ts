/**
 * Index Application
 * Used to fetch paginated data with any sort, filter and search
 */

import { OrderDirectionType } from 'src/common/enums/index.enum';
import { IAppBaseEntity } from 'src/common/interfaces/index-entity.interface';
import {
	IPaginateRequest,
	IPaginateResponse,
	IPaginationMeta
} from 'src/common/interfaces/index.interface';

export enum IndexOrderEnum {
	Asc = 'ASC',
	Desc = 'DESC'
}

export abstract class BaseIndexService {
	readonly DefaultPerPage: number = 10;
	readonly DefaultPage: number = 1;
	readonly DefaultSort: string = 'created_at';
	readonly DefaultOrder: OrderDirectionType = 'DESC';

	abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<IAppBaseEntity>>;

	countOffset({ page, perPage }: IPaginateRequest): number {
		page = page ?? this.DefaultPage;
		perPage = perPage ?? this.DefaultPerPage;

		return (page - 1) * perPage;
	}

	getOrder(order: string): IndexOrderEnum {
		return order == IndexOrderEnum.Asc ? IndexOrderEnum.Asc : IndexOrderEnum.Desc
	}

	take(amount: number): number {
		return amount ?? 25
	}

	orderByKey(table: string, keys: string[], sort: string): string {
		return keys.includes(sort)
			? `${table}.${sort}`
			: `${table}.updatedAt`
	}

	querySearch(table: string, keys: string[]): string {
		const querySearch = ''

		for (const key of keys) {
			querySearch.concat(`lower(${table}.${key}) like :search or `)
		}

		return querySearch.slice(0, -4);
	}

	mapMeta(
		count: number,
		{ page, perPage }: IPaginateRequest,
	): IPaginationMeta {
		page = page ?? this.DefaultPage;
		perPage = perPage ?? this.DefaultPerPage;

		return {
			page: page,
			perPage: perPage,
			total: count,
			totalPage: Math.ceil(count / perPage),
		};
	}
}
