import test from "node:test";
import assert from "node:assert/strict";
import { initialOSState,windowReducer,parseCommand,traverse,followStory,OFFICE_GRAPH,ADVENTURE_GRAPH,antReducer,snakeStep,safeRestore } from "./maxwellOS";

test("window manager opens, focuses, moves, minimizes, maximizes and closes",()=>{let s=windowReducer(initialOSState,{type:"open",app:"files",title:"Explorer"});assert.equal(s.windows.length,1);s=windowReducer(s,{type:"move",id:s.windows[0].id,x:-4,y:22});assert.equal(s.windows[0].x,0);s=windowReducer(s,{type:"minimize",id:s.windows[0].id});assert.equal(s.windows[0].minimized,true);s=windowReducer(s,{type:"maximize",id:s.windows[0].id});assert.equal(s.windows[0].maximized,true);s=windowReducer(s,{type:"close",id:s.windows[0].id});assert.equal(s.windows.length,0)});
test("opening an existing app focuses rather than duplicates",()=>{let s=windowReducer(initialOSState,{type:"open",app:"notes",title:"Notes"});s=windowReducer(s,{type:"open",app:"notes",title:"Notes"});assert.equal(s.windows.length,1);assert.equal(s.windows[0].z,3)});
test("terminal parser allowlists apps and handles utilities",()=>{assert.equal(parseCommand("date","NOW").output,"NOW");assert.equal(parseCommand("clear").clear,true);assert.equal(parseCommand("open mines").open,"mines");assert.match(parseCommand("rm -rf" ).output,/not found/);assert.equal(parseCommand("vacuum").vacuum,true)});
test("filesystem traverses without escaping tree",()=>{assert.equal(traverse(["Documents"])?.kind,"folder");assert.equal(traverse(["nope"]),null)});
test("story graphs follow valid branches and reject invalid choices",()=>{assert.equal(followStory(OFFICE_GRAPH,"lobby",0),"meeting");assert.equal(followStory(ADVENTURE_GRAPH,"dock",99),null)});
test("ant reducer caps swarm and cleanup invalidates generation",()=>{let s={active:false,count:0,generation:0};s=antReducer(s,{type:"release",amount:999});assert.equal(s.count,80);s=antReducer(s,{type:"clear"});assert.deepEqual(s,{active:false,count:0,generation:1})});
test("snake wraps and detects itself",()=>{assert.deepEqual(snakeStep([{x:0,y:0}],{x:-1,y:0},12).body[0],{x:11,y:0});assert.equal(snakeStep([{x:1,y:0},{x:0,y:0}],{x:-1,y:0}).hit,true)});
test("safe restore clears lifecycle residue",()=>{assert.deepEqual(safeRestore({title:"x",scrollX:2,scrollY:3}),{title:"x",scrollX:2,scrollY:3,active:false,ants:0,timers:0})});
