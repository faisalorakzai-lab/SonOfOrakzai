import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { BlogPost, ContactMessage, CreateContactBody, CreateMemberBody, HealthStatus, ImpactStats, ListBlogPostsParams, ListMembersParams, Member, MembersStats, UpdateMemberBody } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all members
 */
export declare const getListMembersUrl: (params?: ListMembersParams) => string;
export declare const listMembers: (params?: ListMembersParams, options?: RequestInit) => Promise<Member[]>;
export declare const getListMembersQueryKey: (params?: ListMembersParams) => readonly ["/api/members", ...ListMembersParams[]];
export declare const getListMembersQueryOptions: <TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(params?: ListMembersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMembersQueryResult = NonNullable<Awaited<ReturnType<typeof listMembers>>>;
export type ListMembersQueryError = ErrorType<unknown>;
/**
 * @summary List all members
 */
export declare function useListMembers<TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(params?: ListMembersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Submit membership application
 */
export declare const getCreateMemberUrl: () => string;
export declare const createMember: (createMemberBody: CreateMemberBody, options?: RequestInit) => Promise<Member>;
export declare const getCreateMemberMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
        data: BodyType<CreateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
    data: BodyType<CreateMemberBody>;
}, TContext>;
export type CreateMemberMutationResult = NonNullable<Awaited<ReturnType<typeof createMember>>>;
export type CreateMemberMutationBody = BodyType<CreateMemberBody>;
export type CreateMemberMutationError = ErrorType<void>;
/**
 * @summary Submit membership application
 */
export declare const useCreateMember: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
        data: BodyType<CreateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMember>>, TError, {
    data: BodyType<CreateMemberBody>;
}, TContext>;
/**
 * @summary Get a single member
 */
export declare const getGetMemberUrl: (id: number) => string;
export declare const getMember: (id: number, options?: RequestInit) => Promise<Member>;
export declare const getGetMemberQueryKey: (id: number) => readonly [`/api/members/${number}`];
export declare const getGetMemberQueryOptions: <TData = Awaited<ReturnType<typeof getMember>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMemberQueryResult = NonNullable<Awaited<ReturnType<typeof getMember>>>;
export type GetMemberQueryError = ErrorType<void>;
/**
 * @summary Get a single member
 */
export declare function useGetMember<TData = Awaited<ReturnType<typeof getMember>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update member status
 */
export declare const getUpdateMemberUrl: (id: number) => string;
export declare const updateMember: (id: number, updateMemberBody: UpdateMemberBody, options?: RequestInit) => Promise<Member>;
export declare const getUpdateMemberMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
        id: number;
        data: BodyType<UpdateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
    id: number;
    data: BodyType<UpdateMemberBody>;
}, TContext>;
export type UpdateMemberMutationResult = NonNullable<Awaited<ReturnType<typeof updateMember>>>;
export type UpdateMemberMutationBody = BodyType<UpdateMemberBody>;
export type UpdateMemberMutationError = ErrorType<void>;
/**
 * @summary Update member status
 */
export declare const useUpdateMember: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
        id: number;
        data: BodyType<UpdateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMember>>, TError, {
    id: number;
    data: BodyType<UpdateMemberBody>;
}, TContext>;
/**
 * @summary Get member statistics overview
 */
export declare const getGetMembersStatsUrl: () => string;
export declare const getMembersStats: (options?: RequestInit) => Promise<MembersStats>;
export declare const getGetMembersStatsQueryKey: () => readonly ["/api/members/stats/overview"];
export declare const getGetMembersStatsQueryOptions: <TData = Awaited<ReturnType<typeof getMembersStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMembersStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMembersStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMembersStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getMembersStats>>>;
export type GetMembersStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get member statistics overview
 */
export declare function useGetMembersStats<TData = Awaited<ReturnType<typeof getMembersStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMembersStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List blog posts
 */
export declare const getListBlogPostsUrl: (params?: ListBlogPostsParams) => string;
export declare const listBlogPosts: (params?: ListBlogPostsParams, options?: RequestInit) => Promise<BlogPost[]>;
export declare const getListBlogPostsQueryKey: (params?: ListBlogPostsParams) => readonly ["/api/blog", ...ListBlogPostsParams[]];
export declare const getListBlogPostsQueryOptions: <TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(params?: ListBlogPostsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBlogPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listBlogPosts>>>;
export type ListBlogPostsQueryError = ErrorType<unknown>;
/**
 * @summary List blog posts
 */
export declare function useListBlogPosts<TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(params?: ListBlogPostsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a blog post
 */
export declare const getGetBlogPostUrl: (id: number) => string;
export declare const getBlogPost: (id: number, options?: RequestInit) => Promise<BlogPost>;
export declare const getGetBlogPostQueryKey: (id: number) => readonly [`/api/blog/${number}`];
export declare const getGetBlogPostQueryOptions: <TData = Awaited<ReturnType<typeof getBlogPost>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBlogPostQueryResult = NonNullable<Awaited<ReturnType<typeof getBlogPost>>>;
export type GetBlogPostQueryError = ErrorType<void>;
/**
 * @summary Get a blog post
 */
export declare function useGetBlogPost<TData = Awaited<ReturnType<typeof getBlogPost>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPost>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Submit contact form
 */
export declare const getSubmitContactUrl: () => string;
export declare const submitContact: (createContactBody: CreateContactBody, options?: RequestInit) => Promise<ContactMessage>;
export declare const getSubmitContactMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<CreateContactBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<CreateContactBody>;
}, TContext>;
export type SubmitContactMutationResult = NonNullable<Awaited<ReturnType<typeof submitContact>>>;
export type SubmitContactMutationBody = BodyType<CreateContactBody>;
export type SubmitContactMutationError = ErrorType<unknown>;
/**
 * @summary Submit contact form
 */
export declare const useSubmitContact: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<CreateContactBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<CreateContactBody>;
}, TContext>;
/**
 * @summary Get impact statistics
 */
export declare const getGetImpactStatsUrl: () => string;
export declare const getImpactStats: (options?: RequestInit) => Promise<ImpactStats>;
export declare const getGetImpactStatsQueryKey: () => readonly ["/api/stats"];
export declare const getGetImpactStatsQueryOptions: <TData = Awaited<ReturnType<typeof getImpactStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getImpactStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getImpactStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetImpactStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getImpactStats>>>;
export type GetImpactStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get impact statistics
 */
export declare function useGetImpactStats<TData = Awaited<ReturnType<typeof getImpactStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getImpactStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map