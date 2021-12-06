const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync  } = require('@graphql-tools/load-files');

// schema.js 파일이 /src/ 경로에 있기 때문에 /src/ 기준이다.

// api 폴더에 있는 모든 폴더(**)의 모든 graphql 파일(*)을 배열 객체로 로드
const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));

// api 폴더에 있는 모든 폴더(**)의 모든 js 파일(*)을 배열 객체로 로드
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    // allTypes를 한 개의 문자열로 통합
    typeDefs: mergeTypeDefs(allTypes, {all: true}),
    // allResolvers를 한 개의 자바스크립트 코드로 통합
    resolvers: mergeResolvers(allResolvers)
});

console.log("schema: ", schema);

export {
    schema
};