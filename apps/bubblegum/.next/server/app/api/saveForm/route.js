"use strict";(()=>{var e={};e.id=762,e.ids=[762],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},70589:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>h,originalPathname:()=>D,patchFetch:()=>E,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>v});var a={};t.r(a),t.d(a,{POST:()=>p});var o=t(75607),s=t(83427),n=t(16547);let c=require("@prisma/client");var u=t(48091);let i=new c.PrismaClient;async function p(e){let r;let t="user_"+Math.floor(1e6*Math.random());try{r=await e.json()}catch(e){return console.error("Error fetching or parsing request body",e),u.Z.json({error:"Error fetching or parsing request body",success:!1})}try{let e=await i.user.upsert({where:{userId:t},update:{docData:{create:{status:"DRAFT",product:{connect:{productId:"PRODUCT1"}},docName:r.textExample,formData:r}}},create:{userId:t,license:{create:{licenseType:"FREE",licenseDuration:"ONE_YEAR",licenseStart:new Date,licenseExpire:new Date("3000-01-01T00:00:00Z")}},docData:{create:{status:"DRAFT",product:{connect:{productId:"PRODUCT1"}},docName:r.textExample,formData:r}}}});return u.Z.json(e)}catch(e){return e instanceof Error?console.error("[Error][POST User and/or Document Creation]",{errorMessage:e.message,generatedUserId:t}):console.error("Unknown error. Please contact support.",e),u.Z.json({error:"Error occurred while creating a user. Please try again or contact support.",success:!1})}}let d=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/saveForm/route",pathname:"/api/saveForm",filename:"route",bundlePath:"app/api/saveForm/route"},resolvedPagePath:"/Users/taylor/Documents/GitHub/project_bubblegum/apps/bubblegum/app/api/saveForm/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:g,headerHooks:h,staticGenerationBailout:v}=d,D="/api/saveForm/route";function E(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},75607:(e,r,t)=>{e.exports=t(30517)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[753],()=>t(70589));module.exports=a})();