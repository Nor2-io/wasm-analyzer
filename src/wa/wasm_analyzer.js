import { environment, exit as exit$1, stderr, stdin, stdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { InputStream,
  OutputStream } = streams;
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let curResourceBorrows = [];

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const emptyFunc = () => {};

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function finalizationRegistryCreate (unregister) {
  if (typeof FinalizationRegistry === 'undefined') {
    return { unregister () {} };
  }
  return new FinalizationRegistry(unregister);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const handleTables = [];

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

function throwInvalidBool() {
  throw new TypeError('invalid variant discriminant for bool');
}

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
let exports1;
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

function trampoline8() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}

const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;

function trampoline9() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  return handle0;
}


function trampoline10() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}


function trampoline11(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

let exports2;
let memory0;
let realloc0;

function trampoline12(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline13(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = filesystemErrorCode(rsc0);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
}

const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;

function trampoline14(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable1, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline15(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.appendViaStream()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable1, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline16(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getType()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stat()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((v3_0) instanceof Error) {
            console.error(v3_0);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'access': {
          enum11 = 0;
          break;
        }
        case 'would-block': {
          enum11 = 1;
          break;
        }
        case 'already': {
          enum11 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum11 = 3;
          break;
        }
        case 'busy': {
          enum11 = 4;
          break;
        }
        case 'deadlock': {
          enum11 = 5;
          break;
        }
        case 'quota': {
          enum11 = 6;
          break;
        }
        case 'exist': {
          enum11 = 7;
          break;
        }
        case 'file-too-large': {
          enum11 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum11 = 9;
          break;
        }
        case 'in-progress': {
          enum11 = 10;
          break;
        }
        case 'interrupted': {
          enum11 = 11;
          break;
        }
        case 'invalid': {
          enum11 = 12;
          break;
        }
        case 'io': {
          enum11 = 13;
          break;
        }
        case 'is-directory': {
          enum11 = 14;
          break;
        }
        case 'loop': {
          enum11 = 15;
          break;
        }
        case 'too-many-links': {
          enum11 = 16;
          break;
        }
        case 'message-size': {
          enum11 = 17;
          break;
        }
        case 'name-too-long': {
          enum11 = 18;
          break;
        }
        case 'no-device': {
          enum11 = 19;
          break;
        }
        case 'no-entry': {
          enum11 = 20;
          break;
        }
        case 'no-lock': {
          enum11 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum11 = 22;
          break;
        }
        case 'insufficient-space': {
          enum11 = 23;
          break;
        }
        case 'not-directory': {
          enum11 = 24;
          break;
        }
        case 'not-empty': {
          enum11 = 25;
          break;
        }
        case 'not-recoverable': {
          enum11 = 26;
          break;
        }
        case 'unsupported': {
          enum11 = 27;
          break;
        }
        case 'no-tty': {
          enum11 = 28;
          break;
        }
        case 'no-such-device': {
          enum11 = 29;
          break;
        }
        case 'overflow': {
          enum11 = 30;
          break;
        }
        case 'not-permitted': {
          enum11 = 31;
          break;
        }
        case 'pipe': {
          enum11 = 32;
          break;
        }
        case 'read-only': {
          enum11 = 33;
          break;
        }
        case 'invalid-seek': {
          enum11 = 34;
          break;
        }
        case 'text-file-busy': {
          enum11 = 35;
          break;
        }
        case 'cross-device': {
          enum11 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline18(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkWrite()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline19(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline20(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingFlush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline21(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteAndFlush(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline22(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}


function trampoline23(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt3;
      captureTable3.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable3, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

let exports3;
let realloc1;
let postReturn0;
let postReturn1;
let postReturn2;
let postReturn3;
let postReturn4;
let postReturn5;
let postReturn6;
const handleTable4 = [T_FLAG, 0];
const finalizationRegistry4 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable4, handle);
  exports0['5'](rep);
});

handleTables[4] = handleTable4;
const trampoline0 = rscTableCreateOwn.bind(null, handleTable4);
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    
    exports0['5'](handleEntry.rep);
  }
}
const handleTable5 = [T_FLAG, 0];
const finalizationRegistry5 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable5, handle);
  exports0['6'](rep);
});

handleTables[5] = handleTable5;
const trampoline2 = rscTableCreateOwn.bind(null, handleTable5);
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable5, handle);
  if (handleEntry.own) {
    
    exports0['6'](handleEntry.rep);
  }
}
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline5(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline6(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline7(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let reader010ConstructorComponent;

class Component{
  constructor(arg0) {
    var val0 = arg0;
    var len0 = val0.byteLength;
    var ptr0 = realloc1(0, 0, 1, len0 * 1);
    var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
    (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
    const ret = reader010ConstructorComponent(ptr0, len0);
    var handle2 = ret;
    var rsc1 = new.target === Component ? this : Object.create(Component.prototype);
    Object.defineProperty(rsc1, symbolRscHandle, { writable: true, value: handle2});
    finalizationRegistry4.register(rsc1, handle2, rsc1);
    Object.defineProperty(rsc1, symbolDispose, { writable: true, value: function () {
      finalizationRegistry4.unregister(rsc1);
      rscTableRemove(handleTable4, handle2);
      rsc1[symbolDispose] = emptyFunc;
      rsc1[symbolRscHandle] = undefined;
      exports0['5'](handleTable4[(handle2 << 1) + 1] & ~T_FLAG);
    }});
    return rsc1;
  }
}
let reader010MethodComponentGetType;

Component.prototype.getType = function getType() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetType(handle0);
  let enum2;
  switch (ret) {
    case 0: {
      enum2 = 'core';
      break;
    }
    case 1: {
      enum2 = 'component';
      break;
    }
    case 2: {
      enum2 = 'interface';
      break;
    }
    default: {
      throw new TypeError('invalid discriminant specified for WasmModuleType');
    }
  }
  return enum2;
};
let reader010MethodComponentGetModuleInformation;

Component.prototype.getModuleInformation = function getModuleInformation() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetModuleInformation(handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
  var ptr3 = dataView(memory0).getInt32(ret + 16, true);
  var len3 = dataView(memory0).getInt32(ret + 20, true);
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var ptr4 = dataView(memory0).getInt32(ret + 24, true);
  var len4 = dataView(memory0).getInt32(ret + 28, true);
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  var len8 = dataView(memory0).getInt32(ret + 36, true);
  var base8 = dataView(memory0).getInt32(ret + 32, true);
  var result8 = [];
  for (let i = 0; i < len8; i++) {
    const base = base8 + i * 20;
    var ptr5 = dataView(memory0).getInt32(base + 0, true);
    var len5 = dataView(memory0).getInt32(base + 4, true);
    var result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
    let variant7;
    switch (dataView(memory0).getUint8(base + 8, true)) {
      case 0: {
        variant7 = undefined;
        break;
      }
      case 1: {
        var ptr6 = dataView(memory0).getInt32(base + 12, true);
        var len6 = dataView(memory0).getInt32(base + 16, true);
        var result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
        variant7 = result6;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result8.push({
      field: result5,
      version: variant7,
    });
  }
  var len12 = dataView(memory0).getInt32(ret + 44, true);
  var base12 = dataView(memory0).getInt32(ret + 40, true);
  var result12 = [];
  for (let i = 0; i < len12; i++) {
    const base = base12 + i * 20;
    var ptr9 = dataView(memory0).getInt32(base + 0, true);
    var len9 = dataView(memory0).getInt32(base + 4, true);
    var result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
    let variant11;
    switch (dataView(memory0).getUint8(base + 8, true)) {
      case 0: {
        variant11 = undefined;
        break;
      }
      case 1: {
        var ptr10 = dataView(memory0).getInt32(base + 12, true);
        var len10 = dataView(memory0).getInt32(base + 16, true);
        var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
        variant11 = result10;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result12.push({
      field: result9,
      version: variant11,
    });
  }
  var len16 = dataView(memory0).getInt32(ret + 52, true);
  var base16 = dataView(memory0).getInt32(ret + 48, true);
  var result16 = [];
  for (let i = 0; i < len16; i++) {
    const base = base16 + i * 20;
    var ptr13 = dataView(memory0).getInt32(base + 0, true);
    var len13 = dataView(memory0).getInt32(base + 4, true);
    var result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
    let variant15;
    switch (dataView(memory0).getUint8(base + 8, true)) {
      case 0: {
        variant15 = undefined;
        break;
      }
      case 1: {
        var ptr14 = dataView(memory0).getInt32(base + 12, true);
        var len14 = dataView(memory0).getInt32(base + 16, true);
        var result14 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr14, len14));
        variant15 = result14;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result16.push({
      field: result13,
      version: variant15,
    });
  }
  var len21 = dataView(memory0).getInt32(ret + 60, true);
  var base21 = dataView(memory0).getInt32(ret + 56, true);
  var result21 = [];
  for (let i = 0; i < len21; i++) {
    const base = base21 + i * 28;
    var ptr17 = dataView(memory0).getInt32(base + 0, true);
    var len17 = dataView(memory0).getInt32(base + 4, true);
    var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
    var ptr18 = dataView(memory0).getInt32(base + 8, true);
    var len18 = dataView(memory0).getInt32(base + 12, true);
    var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
    let variant20;
    switch (dataView(memory0).getUint8(base + 16, true)) {
      case 0: {
        variant20 = undefined;
        break;
      }
      case 1: {
        var ptr19 = dataView(memory0).getInt32(base + 20, true);
        var len19 = dataView(memory0).getInt32(base + 24, true);
        var result19 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr19, len19));
        variant20 = result19;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result21.push({
      field: result17,
      metadata: {
        field: result18,
        version: variant20,
      },
    });
  }
  const retVal = {
    name: result2,
    size: BigInt.asUintN(64, dataView(memory0).getBigInt64(ret + 8, true)),
    humanSize: result3,
    sha256: result4,
    languages: result8,
    tools: result12,
    sdks: result16,
    unknowMetadata: result21,
    numCustomSections: dataView(memory0).getInt32(ret + 64, true) >>> 0,
    numCoreImports: dataView(memory0).getInt32(ret + 68, true) >>> 0,
    numCoreExport: dataView(memory0).getInt32(ret + 72, true) >>> 0,
  };
  postReturn0(ret);
  return retVal;
};
let reader010MethodComponentGetCoreImports;

Component.prototype.getCoreImports = function getCoreImports() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetCoreImports(handle0);
  var len10 = dataView(memory0).getInt32(ret + 4, true);
  var base10 = dataView(memory0).getInt32(ret + 0, true);
  var result10 = [];
  for (let i = 0; i < len10; i++) {
    const base = base10 + i * 36;
    var ptr2 = dataView(memory0).getInt32(base + 0, true);
    var len2 = dataView(memory0).getInt32(base + 4, true);
    var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
    var ptr3 = dataView(memory0).getInt32(base + 8, true);
    var len3 = dataView(memory0).getInt32(base + 12, true);
    var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
    var len6 = dataView(memory0).getInt32(base + 24, true);
    var base6 = dataView(memory0).getInt32(base + 20, true);
    var result6 = [];
    for (let i = 0; i < len6; i++) {
      const base = base6 + i * 12;
      let variant5;
      switch (dataView(memory0).getUint8(base + 0, true)) {
        case 0: {
          variant5= {
            tag: 'i32',
          };
          break;
        }
        case 1: {
          variant5= {
            tag: 'i64',
          };
          break;
        }
        case 2: {
          variant5= {
            tag: 'f32',
          };
          break;
        }
        case 3: {
          variant5= {
            tag: 'f64',
          };
          break;
        }
        case 4: {
          variant5= {
            tag: 'v128',
          };
          break;
        }
        case 5: {
          let variant4;
          switch (dataView(memory0).getUint8(base + 4, true)) {
            case 0: {
              variant4= {
                tag: 'any',
              };
              break;
            }
            case 1: {
              variant4= {
                tag: 'none',
              };
              break;
            }
            case 2: {
              variant4= {
                tag: 'no-extern',
              };
              break;
            }
            case 3: {
              variant4= {
                tag: 'no-func',
              };
              break;
            }
            case 4: {
              variant4= {
                tag: 'eq',
              };
              break;
            }
            case 5: {
              variant4= {
                tag: 'struct',
              };
              break;
            }
            case 6: {
              variant4= {
                tag: 'array',
              };
              break;
            }
            case 7: {
              variant4= {
                tag: 'i31',
              };
              break;
            }
            case 8: {
              variant4= {
                tag: 'extern',
              };
              break;
            }
            case 9: {
              variant4= {
                tag: 'func',
              };
              break;
            }
            case 10: {
              variant4= {
                tag: 'exn',
              };
              break;
            }
            case 11: {
              variant4= {
                tag: 'no-exn',
              };
              break;
            }
            case 12: {
              variant4= {
                tag: 'cont',
              };
              break;
            }
            case 13: {
              variant4= {
                tag: 'no-cont',
              };
              break;
            }
            case 14: {
              variant4= {
                tag: 'indexed',
                val: dataView(memory0).getInt32(base + 8, true) >>> 0
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for RefType');
            }
          }
          variant5= {
            tag: 'ref-type',
            val: variant4
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for WasmType');
        }
      }
      result6.push(variant5);
    }
    var len9 = dataView(memory0).getInt32(base + 32, true);
    var base9 = dataView(memory0).getInt32(base + 28, true);
    var result9 = [];
    for (let i = 0; i < len9; i++) {
      const base = base9 + i * 12;
      let variant8;
      switch (dataView(memory0).getUint8(base + 0, true)) {
        case 0: {
          variant8= {
            tag: 'i32',
          };
          break;
        }
        case 1: {
          variant8= {
            tag: 'i64',
          };
          break;
        }
        case 2: {
          variant8= {
            tag: 'f32',
          };
          break;
        }
        case 3: {
          variant8= {
            tag: 'f64',
          };
          break;
        }
        case 4: {
          variant8= {
            tag: 'v128',
          };
          break;
        }
        case 5: {
          let variant7;
          switch (dataView(memory0).getUint8(base + 4, true)) {
            case 0: {
              variant7= {
                tag: 'any',
              };
              break;
            }
            case 1: {
              variant7= {
                tag: 'none',
              };
              break;
            }
            case 2: {
              variant7= {
                tag: 'no-extern',
              };
              break;
            }
            case 3: {
              variant7= {
                tag: 'no-func',
              };
              break;
            }
            case 4: {
              variant7= {
                tag: 'eq',
              };
              break;
            }
            case 5: {
              variant7= {
                tag: 'struct',
              };
              break;
            }
            case 6: {
              variant7= {
                tag: 'array',
              };
              break;
            }
            case 7: {
              variant7= {
                tag: 'i31',
              };
              break;
            }
            case 8: {
              variant7= {
                tag: 'extern',
              };
              break;
            }
            case 9: {
              variant7= {
                tag: 'func',
              };
              break;
            }
            case 10: {
              variant7= {
                tag: 'exn',
              };
              break;
            }
            case 11: {
              variant7= {
                tag: 'no-exn',
              };
              break;
            }
            case 12: {
              variant7= {
                tag: 'cont',
              };
              break;
            }
            case 13: {
              variant7= {
                tag: 'no-cont',
              };
              break;
            }
            case 14: {
              variant7= {
                tag: 'indexed',
                val: dataView(memory0).getInt32(base + 8, true) >>> 0
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for RefType');
            }
          }
          variant8= {
            tag: 'ref-type',
            val: variant7
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for WasmType');
        }
      }
      result9.push(variant8);
    }
    result10.push({
      module: result2,
      field: result3,
      index: dataView(memory0).getInt32(base + 16, true) >>> 0,
      params: result6,
      results: result9,
    });
  }
  var len16 = dataView(memory0).getInt32(ret + 12, true);
  var base16 = dataView(memory0).getInt32(ret + 8, true);
  var result16 = [];
  for (let i = 0; i < len16; i++) {
    const base = base16 + i * 56;
    var ptr11 = dataView(memory0).getInt32(base + 0, true);
    var len11 = dataView(memory0).getInt32(base + 4, true);
    var result11 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr11, len11));
    var ptr12 = dataView(memory0).getInt32(base + 8, true);
    var len12 = dataView(memory0).getInt32(base + 12, true);
    var result12 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr12, len12));
    let variant14;
    switch (dataView(memory0).getUint8(base + 20, true)) {
      case 0: {
        variant14= {
          tag: 'i32',
        };
        break;
      }
      case 1: {
        variant14= {
          tag: 'i64',
        };
        break;
      }
      case 2: {
        variant14= {
          tag: 'f32',
        };
        break;
      }
      case 3: {
        variant14= {
          tag: 'f64',
        };
        break;
      }
      case 4: {
        variant14= {
          tag: 'v128',
        };
        break;
      }
      case 5: {
        let variant13;
        switch (dataView(memory0).getUint8(base + 24, true)) {
          case 0: {
            variant13= {
              tag: 'any',
            };
            break;
          }
          case 1: {
            variant13= {
              tag: 'none',
            };
            break;
          }
          case 2: {
            variant13= {
              tag: 'no-extern',
            };
            break;
          }
          case 3: {
            variant13= {
              tag: 'no-func',
            };
            break;
          }
          case 4: {
            variant13= {
              tag: 'eq',
            };
            break;
          }
          case 5: {
            variant13= {
              tag: 'struct',
            };
            break;
          }
          case 6: {
            variant13= {
              tag: 'array',
            };
            break;
          }
          case 7: {
            variant13= {
              tag: 'i31',
            };
            break;
          }
          case 8: {
            variant13= {
              tag: 'extern',
            };
            break;
          }
          case 9: {
            variant13= {
              tag: 'func',
            };
            break;
          }
          case 10: {
            variant13= {
              tag: 'exn',
            };
            break;
          }
          case 11: {
            variant13= {
              tag: 'no-exn',
            };
            break;
          }
          case 12: {
            variant13= {
              tag: 'cont',
            };
            break;
          }
          case 13: {
            variant13= {
              tag: 'no-cont',
            };
            break;
          }
          case 14: {
            variant13= {
              tag: 'indexed',
              val: dataView(memory0).getInt32(base + 28, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for RefType');
          }
        }
        variant14= {
          tag: 'ref-type',
          val: variant13
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for WasmType');
      }
    }
    let variant15;
    switch (dataView(memory0).getUint8(base + 40, true)) {
      case 0: {
        variant15 = undefined;
        break;
      }
      case 1: {
        variant15 = BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 48, true));
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result16.push({
      module: result11,
      field: result12,
      index: dataView(memory0).getInt32(base + 16, true) >>> 0,
      ty: variant14,
      minimum: BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 32, true)),
      maximum: variant15,
    });
  }
  var len25 = dataView(memory0).getInt32(ret + 20, true);
  var base25 = dataView(memory0).getInt32(ret + 16, true);
  var result25 = [];
  for (let i = 0; i < len25; i++) {
    const base = base25 + i * 72;
    var ptr17 = dataView(memory0).getInt32(base + 0, true);
    var len17 = dataView(memory0).getInt32(base + 4, true);
    var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
    var ptr18 = dataView(memory0).getInt32(base + 8, true);
    var len18 = dataView(memory0).getInt32(base + 12, true);
    var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
    let variant19;
    switch (dataView(memory0).getUint8(base + 32, true)) {
      case 0: {
        variant19 = undefined;
        break;
      }
      case 1: {
        variant19 = BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 40, true));
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    var ptr20 = dataView(memory0).getInt32(base + 48, true);
    var len20 = dataView(memory0).getInt32(base + 52, true);
    var result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
    let variant22;
    switch (dataView(memory0).getUint8(base + 56, true)) {
      case 0: {
        variant22 = undefined;
        break;
      }
      case 1: {
        var ptr21 = dataView(memory0).getInt32(base + 60, true);
        var len21 = dataView(memory0).getInt32(base + 64, true);
        var result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
        variant22 = result21;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    var bool23 = dataView(memory0).getUint8(base + 68, true);
    var bool24 = dataView(memory0).getUint8(base + 69, true);
    result25.push({
      module: result17,
      field: result18,
      index: dataView(memory0).getInt32(base + 16, true) >>> 0,
      minimumPages: BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 24, true)),
      maximumPages: variant19,
      humanMinimumSize: result20,
      humanMaximumSize: variant22,
      shared: bool23 == 0 ? false : (bool23 == 1 ? true : throwInvalidBool()),
      memory64: bool24 == 0 ? false : (bool24 == 1 ? true : throwInvalidBool()),
    });
  }
  var len31 = dataView(memory0).getInt32(ret + 28, true);
  var base31 = dataView(memory0).getInt32(ret + 24, true);
  var result31 = [];
  for (let i = 0; i < len31; i++) {
    const base = base31 + i * 36;
    var ptr26 = dataView(memory0).getInt32(base + 0, true);
    var len26 = dataView(memory0).getInt32(base + 4, true);
    var result26 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr26, len26));
    var ptr27 = dataView(memory0).getInt32(base + 8, true);
    var len27 = dataView(memory0).getInt32(base + 12, true);
    var result27 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr27, len27));
    let variant29;
    switch (dataView(memory0).getUint8(base + 20, true)) {
      case 0: {
        variant29= {
          tag: 'i32',
        };
        break;
      }
      case 1: {
        variant29= {
          tag: 'i64',
        };
        break;
      }
      case 2: {
        variant29= {
          tag: 'f32',
        };
        break;
      }
      case 3: {
        variant29= {
          tag: 'f64',
        };
        break;
      }
      case 4: {
        variant29= {
          tag: 'v128',
        };
        break;
      }
      case 5: {
        let variant28;
        switch (dataView(memory0).getUint8(base + 24, true)) {
          case 0: {
            variant28= {
              tag: 'any',
            };
            break;
          }
          case 1: {
            variant28= {
              tag: 'none',
            };
            break;
          }
          case 2: {
            variant28= {
              tag: 'no-extern',
            };
            break;
          }
          case 3: {
            variant28= {
              tag: 'no-func',
            };
            break;
          }
          case 4: {
            variant28= {
              tag: 'eq',
            };
            break;
          }
          case 5: {
            variant28= {
              tag: 'struct',
            };
            break;
          }
          case 6: {
            variant28= {
              tag: 'array',
            };
            break;
          }
          case 7: {
            variant28= {
              tag: 'i31',
            };
            break;
          }
          case 8: {
            variant28= {
              tag: 'extern',
            };
            break;
          }
          case 9: {
            variant28= {
              tag: 'func',
            };
            break;
          }
          case 10: {
            variant28= {
              tag: 'exn',
            };
            break;
          }
          case 11: {
            variant28= {
              tag: 'no-exn',
            };
            break;
          }
          case 12: {
            variant28= {
              tag: 'cont',
            };
            break;
          }
          case 13: {
            variant28= {
              tag: 'no-cont',
            };
            break;
          }
          case 14: {
            variant28= {
              tag: 'indexed',
              val: dataView(memory0).getInt32(base + 28, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for RefType');
          }
        }
        variant29= {
          tag: 'ref-type',
          val: variant28
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for WasmType');
      }
    }
    var bool30 = dataView(memory0).getUint8(base + 32, true);
    result31.push({
      module: result26,
      field: result27,
      index: dataView(memory0).getInt32(base + 16, true) >>> 0,
      ty: variant29,
      mutable: bool30 == 0 ? false : (bool30 == 1 ? true : throwInvalidBool()),
    });
  }
  const retVal = {
    functions: result10,
    tables: result16,
    memories: result25,
    globals: result31,
  };
  postReturn1(ret);
  return retVal;
};
let reader010MethodComponentGetCoreExports;

Component.prototype.getCoreExports = function getCoreExports() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetCoreExports(handle0);
  var len9 = dataView(memory0).getInt32(ret + 4, true);
  var base9 = dataView(memory0).getInt32(ret + 0, true);
  var result9 = [];
  for (let i = 0; i < len9; i++) {
    const base = base9 + i * 28;
    var ptr2 = dataView(memory0).getInt32(base + 0, true);
    var len2 = dataView(memory0).getInt32(base + 4, true);
    var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
    var len5 = dataView(memory0).getInt32(base + 16, true);
    var base5 = dataView(memory0).getInt32(base + 12, true);
    var result5 = [];
    for (let i = 0; i < len5; i++) {
      const base = base5 + i * 12;
      let variant4;
      switch (dataView(memory0).getUint8(base + 0, true)) {
        case 0: {
          variant4= {
            tag: 'i32',
          };
          break;
        }
        case 1: {
          variant4= {
            tag: 'i64',
          };
          break;
        }
        case 2: {
          variant4= {
            tag: 'f32',
          };
          break;
        }
        case 3: {
          variant4= {
            tag: 'f64',
          };
          break;
        }
        case 4: {
          variant4= {
            tag: 'v128',
          };
          break;
        }
        case 5: {
          let variant3;
          switch (dataView(memory0).getUint8(base + 4, true)) {
            case 0: {
              variant3= {
                tag: 'any',
              };
              break;
            }
            case 1: {
              variant3= {
                tag: 'none',
              };
              break;
            }
            case 2: {
              variant3= {
                tag: 'no-extern',
              };
              break;
            }
            case 3: {
              variant3= {
                tag: 'no-func',
              };
              break;
            }
            case 4: {
              variant3= {
                tag: 'eq',
              };
              break;
            }
            case 5: {
              variant3= {
                tag: 'struct',
              };
              break;
            }
            case 6: {
              variant3= {
                tag: 'array',
              };
              break;
            }
            case 7: {
              variant3= {
                tag: 'i31',
              };
              break;
            }
            case 8: {
              variant3= {
                tag: 'extern',
              };
              break;
            }
            case 9: {
              variant3= {
                tag: 'func',
              };
              break;
            }
            case 10: {
              variant3= {
                tag: 'exn',
              };
              break;
            }
            case 11: {
              variant3= {
                tag: 'no-exn',
              };
              break;
            }
            case 12: {
              variant3= {
                tag: 'cont',
              };
              break;
            }
            case 13: {
              variant3= {
                tag: 'no-cont',
              };
              break;
            }
            case 14: {
              variant3= {
                tag: 'indexed',
                val: dataView(memory0).getInt32(base + 8, true) >>> 0
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for RefType');
            }
          }
          variant4= {
            tag: 'ref-type',
            val: variant3
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for WasmType');
        }
      }
      result5.push(variant4);
    }
    var len8 = dataView(memory0).getInt32(base + 24, true);
    var base8 = dataView(memory0).getInt32(base + 20, true);
    var result8 = [];
    for (let i = 0; i < len8; i++) {
      const base = base8 + i * 12;
      let variant7;
      switch (dataView(memory0).getUint8(base + 0, true)) {
        case 0: {
          variant7= {
            tag: 'i32',
          };
          break;
        }
        case 1: {
          variant7= {
            tag: 'i64',
          };
          break;
        }
        case 2: {
          variant7= {
            tag: 'f32',
          };
          break;
        }
        case 3: {
          variant7= {
            tag: 'f64',
          };
          break;
        }
        case 4: {
          variant7= {
            tag: 'v128',
          };
          break;
        }
        case 5: {
          let variant6;
          switch (dataView(memory0).getUint8(base + 4, true)) {
            case 0: {
              variant6= {
                tag: 'any',
              };
              break;
            }
            case 1: {
              variant6= {
                tag: 'none',
              };
              break;
            }
            case 2: {
              variant6= {
                tag: 'no-extern',
              };
              break;
            }
            case 3: {
              variant6= {
                tag: 'no-func',
              };
              break;
            }
            case 4: {
              variant6= {
                tag: 'eq',
              };
              break;
            }
            case 5: {
              variant6= {
                tag: 'struct',
              };
              break;
            }
            case 6: {
              variant6= {
                tag: 'array',
              };
              break;
            }
            case 7: {
              variant6= {
                tag: 'i31',
              };
              break;
            }
            case 8: {
              variant6= {
                tag: 'extern',
              };
              break;
            }
            case 9: {
              variant6= {
                tag: 'func',
              };
              break;
            }
            case 10: {
              variant6= {
                tag: 'exn',
              };
              break;
            }
            case 11: {
              variant6= {
                tag: 'no-exn',
              };
              break;
            }
            case 12: {
              variant6= {
                tag: 'cont',
              };
              break;
            }
            case 13: {
              variant6= {
                tag: 'no-cont',
              };
              break;
            }
            case 14: {
              variant6= {
                tag: 'indexed',
                val: dataView(memory0).getInt32(base + 8, true) >>> 0
              };
              break;
            }
            default: {
              throw new TypeError('invalid variant discriminant for RefType');
            }
          }
          variant7= {
            tag: 'ref-type',
            val: variant6
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for WasmType');
        }
      }
      result8.push(variant7);
    }
    result9.push({
      field: result2,
      index: dataView(memory0).getInt32(base + 8, true) >>> 0,
      params: result5,
      results: result8,
    });
  }
  var len14 = dataView(memory0).getInt32(ret + 12, true);
  var base14 = dataView(memory0).getInt32(ret + 8, true);
  var result14 = [];
  for (let i = 0; i < len14; i++) {
    const base = base14 + i * 48;
    var ptr10 = dataView(memory0).getInt32(base + 0, true);
    var len10 = dataView(memory0).getInt32(base + 4, true);
    var result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
    let variant12;
    switch (dataView(memory0).getUint8(base + 12, true)) {
      case 0: {
        variant12= {
          tag: 'i32',
        };
        break;
      }
      case 1: {
        variant12= {
          tag: 'i64',
        };
        break;
      }
      case 2: {
        variant12= {
          tag: 'f32',
        };
        break;
      }
      case 3: {
        variant12= {
          tag: 'f64',
        };
        break;
      }
      case 4: {
        variant12= {
          tag: 'v128',
        };
        break;
      }
      case 5: {
        let variant11;
        switch (dataView(memory0).getUint8(base + 16, true)) {
          case 0: {
            variant11= {
              tag: 'any',
            };
            break;
          }
          case 1: {
            variant11= {
              tag: 'none',
            };
            break;
          }
          case 2: {
            variant11= {
              tag: 'no-extern',
            };
            break;
          }
          case 3: {
            variant11= {
              tag: 'no-func',
            };
            break;
          }
          case 4: {
            variant11= {
              tag: 'eq',
            };
            break;
          }
          case 5: {
            variant11= {
              tag: 'struct',
            };
            break;
          }
          case 6: {
            variant11= {
              tag: 'array',
            };
            break;
          }
          case 7: {
            variant11= {
              tag: 'i31',
            };
            break;
          }
          case 8: {
            variant11= {
              tag: 'extern',
            };
            break;
          }
          case 9: {
            variant11= {
              tag: 'func',
            };
            break;
          }
          case 10: {
            variant11= {
              tag: 'exn',
            };
            break;
          }
          case 11: {
            variant11= {
              tag: 'no-exn',
            };
            break;
          }
          case 12: {
            variant11= {
              tag: 'cont',
            };
            break;
          }
          case 13: {
            variant11= {
              tag: 'no-cont',
            };
            break;
          }
          case 14: {
            variant11= {
              tag: 'indexed',
              val: dataView(memory0).getInt32(base + 20, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for RefType');
          }
        }
        variant12= {
          tag: 'ref-type',
          val: variant11
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for WasmType');
      }
    }
    let variant13;
    switch (dataView(memory0).getUint8(base + 32, true)) {
      case 0: {
        variant13 = undefined;
        break;
      }
      case 1: {
        variant13 = BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 40, true));
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result14.push({
      field: result10,
      index: dataView(memory0).getInt32(base + 8, true) >>> 0,
      ty: variant12,
      minimum: BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 24, true)),
      maximum: variant13,
    });
  }
  var len22 = dataView(memory0).getInt32(ret + 20, true);
  var base22 = dataView(memory0).getInt32(ret + 16, true);
  var result22 = [];
  for (let i = 0; i < len22; i++) {
    const base = base22 + i * 64;
    var ptr15 = dataView(memory0).getInt32(base + 0, true);
    var len15 = dataView(memory0).getInt32(base + 4, true);
    var result15 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr15, len15));
    let variant16;
    switch (dataView(memory0).getUint8(base + 24, true)) {
      case 0: {
        variant16 = undefined;
        break;
      }
      case 1: {
        variant16 = BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 32, true));
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    var ptr17 = dataView(memory0).getInt32(base + 40, true);
    var len17 = dataView(memory0).getInt32(base + 44, true);
    var result17 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr17, len17));
    let variant19;
    switch (dataView(memory0).getUint8(base + 48, true)) {
      case 0: {
        variant19 = undefined;
        break;
      }
      case 1: {
        var ptr18 = dataView(memory0).getInt32(base + 52, true);
        var len18 = dataView(memory0).getInt32(base + 56, true);
        var result18 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr18, len18));
        variant19 = result18;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    var bool20 = dataView(memory0).getUint8(base + 60, true);
    var bool21 = dataView(memory0).getUint8(base + 61, true);
    result22.push({
      field: result15,
      index: dataView(memory0).getInt32(base + 8, true) >>> 0,
      minimumPages: BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 16, true)),
      maximumPages: variant16,
      humanMinimumSize: result17,
      humanMaximumSize: variant19,
      shared: bool20 == 0 ? false : (bool20 == 1 ? true : throwInvalidBool()),
      memory64: bool21 == 0 ? false : (bool21 == 1 ? true : throwInvalidBool()),
    });
  }
  var len27 = dataView(memory0).getInt32(ret + 28, true);
  var base27 = dataView(memory0).getInt32(ret + 24, true);
  var result27 = [];
  for (let i = 0; i < len27; i++) {
    const base = base27 + i * 28;
    var ptr23 = dataView(memory0).getInt32(base + 0, true);
    var len23 = dataView(memory0).getInt32(base + 4, true);
    var result23 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr23, len23));
    let variant25;
    switch (dataView(memory0).getUint8(base + 12, true)) {
      case 0: {
        variant25= {
          tag: 'i32',
        };
        break;
      }
      case 1: {
        variant25= {
          tag: 'i64',
        };
        break;
      }
      case 2: {
        variant25= {
          tag: 'f32',
        };
        break;
      }
      case 3: {
        variant25= {
          tag: 'f64',
        };
        break;
      }
      case 4: {
        variant25= {
          tag: 'v128',
        };
        break;
      }
      case 5: {
        let variant24;
        switch (dataView(memory0).getUint8(base + 16, true)) {
          case 0: {
            variant24= {
              tag: 'any',
            };
            break;
          }
          case 1: {
            variant24= {
              tag: 'none',
            };
            break;
          }
          case 2: {
            variant24= {
              tag: 'no-extern',
            };
            break;
          }
          case 3: {
            variant24= {
              tag: 'no-func',
            };
            break;
          }
          case 4: {
            variant24= {
              tag: 'eq',
            };
            break;
          }
          case 5: {
            variant24= {
              tag: 'struct',
            };
            break;
          }
          case 6: {
            variant24= {
              tag: 'array',
            };
            break;
          }
          case 7: {
            variant24= {
              tag: 'i31',
            };
            break;
          }
          case 8: {
            variant24= {
              tag: 'extern',
            };
            break;
          }
          case 9: {
            variant24= {
              tag: 'func',
            };
            break;
          }
          case 10: {
            variant24= {
              tag: 'exn',
            };
            break;
          }
          case 11: {
            variant24= {
              tag: 'no-exn',
            };
            break;
          }
          case 12: {
            variant24= {
              tag: 'cont',
            };
            break;
          }
          case 13: {
            variant24= {
              tag: 'no-cont',
            };
            break;
          }
          case 14: {
            variant24= {
              tag: 'indexed',
              val: dataView(memory0).getInt32(base + 20, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for RefType');
          }
        }
        variant25= {
          tag: 'ref-type',
          val: variant24
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for WasmType');
      }
    }
    var bool26 = dataView(memory0).getUint8(base + 24, true);
    result27.push({
      field: result23,
      index: dataView(memory0).getInt32(base + 8, true) >>> 0,
      ty: variant25,
      mutable: bool26 == 0 ? false : (bool26 == 1 ? true : throwInvalidBool()),
    });
  }
  const retVal = {
    functions: result9,
    tables: result14,
    memories: result22,
    globals: result27,
  };
  postReturn2(ret);
  return retVal;
};
let reader010MethodComponentGetCustomSections;

Component.prototype.getCustomSections = function getCustomSections() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetCustomSections(handle0);
  var len4 = dataView(memory0).getInt32(ret + 4, true);
  var base4 = dataView(memory0).getInt32(ret + 0, true);
  var result4 = [];
  for (let i = 0; i < len4; i++) {
    const base = base4 + i * 24;
    var ptr2 = dataView(memory0).getInt32(base + 0, true);
    var len2 = dataView(memory0).getInt32(base + 4, true);
    var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
    var ptr3 = dataView(memory0).getInt32(base + 8, true);
    var len3 = dataView(memory0).getInt32(base + 12, true);
    var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
    result4.push({
      name: result2,
      humanSize: result3,
      size: BigInt.asUintN(64, dataView(memory0).getBigInt64(base + 16, true)),
    });
  }
  const retVal = result4;
  postReturn3(ret);
  return retVal;
};
let reader010MethodComponentGetChildComponents;

Component.prototype.getChildComponents = function getChildComponents() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetChildComponents(handle0);
  var len4 = dataView(memory0).getInt32(ret + 4, true);
  var base4 = dataView(memory0).getInt32(ret + 0, true);
  var result4 = [];
  for (let i = 0; i < len4; i++) {
    const base = base4 + i * 4;
    var handle3 = dataView(memory0).getInt32(base + 0, true);
    var rsc2 = new.target === Component ? this : Object.create(Component.prototype);
    Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
    finalizationRegistry4.register(rsc2, handle3, rsc2);
    Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
      finalizationRegistry4.unregister(rsc2);
      rscTableRemove(handleTable4, handle3);
      rsc2[symbolDispose] = emptyFunc;
      rsc2[symbolRscHandle] = undefined;
      exports0['5'](handleTable4[(handle3 << 1) + 1] & ~T_FLAG);
    }});
    result4.push(rsc2);
  }
  const retVal = result4;
  postReturn4(ret);
  return retVal;
};
let reader010MethodComponentGetWit;

Component.prototype.getWit = function getWit() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetWit(handle0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant3 = undefined;
      break;
    }
    case 1: {
      var ptr2 = dataView(memory0).getInt32(ret + 4, true);
      var len2 = dataView(memory0).getInt32(ret + 8, true);
      var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3 = result2;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  const retVal = variant3;
  postReturn5(ret);
  return retVal;
};
let reader010MethodComponentGetWat;

Component.prototype.getWat = function getWat() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "Component" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodComponentGetWat(handle0);
  var ptr2 = dataView(memory0).getInt32(ret + 0, true);
  var len2 = dataView(memory0).getInt32(ret + 4, true);
  var result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
  const retVal = result2;
  postReturn6(ret);
  return retVal;
};
let reader010ConstructorWasmReader;

class WasmReader{
  constructor(arg0) {
    var val0 = arg0;
    var len0 = val0.byteLength;
    var ptr0 = realloc1(0, 0, 1, len0 * 1);
    var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
    (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
    const ret = reader010ConstructorWasmReader(ptr0, len0);
    var handle2 = ret;
    var rsc1 = new.target === WasmReader ? this : Object.create(WasmReader.prototype);
    Object.defineProperty(rsc1, symbolRscHandle, { writable: true, value: handle2});
    finalizationRegistry5.register(rsc1, handle2, rsc1);
    Object.defineProperty(rsc1, symbolDispose, { writable: true, value: function () {
      finalizationRegistry5.unregister(rsc1);
      rscTableRemove(handleTable5, handle2);
      rsc1[symbolDispose] = emptyFunc;
      rsc1[symbolRscHandle] = undefined;
      exports0['6'](handleTable5[(handle2 << 1) + 1] & ~T_FLAG);
    }});
    return rsc1;
  }
}
let reader010MethodWasmReaderGetRootComponent;

WasmReader.prototype.getRootComponent = function getRootComponent() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "WasmReader" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = reader010MethodWasmReaderGetRootComponent(handle0);
  var handle3 = ret;
  var rsc2 = new.target === Component ? this : Object.create(Component.prototype);
  Object.defineProperty(rsc2, symbolRscHandle, { writable: true, value: handle3});
  finalizationRegistry4.register(rsc2, handle3, rsc2);
  Object.defineProperty(rsc2, symbolDispose, { writable: true, value: function () {
    finalizationRegistry4.unregister(rsc2);
    rscTableRemove(handleTable4, handle3);
    rsc2[symbolDispose] = emptyFunc;
    rsc2[symbolRscHandle] = undefined;
    exports0['5'](handleTable4[(handle3 << 1) + 1] & ~T_FLAG);
  }});
  return rsc2;
};

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./wasm_analyzer.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./wasm_analyzer.core2.wasm', import.meta.url));
    const module2 = base64Compile('AGFzbQEAAAABLghgBH9/f38Bf2ACf38Bf2ABfwBgAX8AYAJ/fwBgA39+fwBgBH9/f38AYAJ+fwADFBMAAQEBAgICAwQFBAQEBAYEBgcDBAUBcAETEwdhFAEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABIIJGltcG9ydHMBAArpARMPACAAIAEgAiADQQARAAALCwAgACABQQERAQALCwAgACABQQIRAQALCwAgACABQQMRAQALCQAgAEEEEQIACwkAIABBBRECAAsJACAAQQYRAgALCQAgAEEHEQMACwsAIAAgAUEIEQQACw0AIAAgASACQQkRBQALCwAgACABQQoRBAALCwAgACABQQsRBAALCwAgACABQQwRBAALCwAgACABQQ0RBAALDwAgACABIAIgA0EOEQYACwsAIAAgAUEPEQQACw8AIAAgASACIANBEBEGAAsLACAAIAFBEREHAAsJACAAQRIRAwALAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMjAuMACXCARuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAfoHEwAlYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZQEnYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1yYW5kb21fZ2V0AihhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fZ2V0Ay5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fc2l6ZXNfZ2V0BCZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXByb2NfZXhpdAUOZHRvci1jb21wb25lbnQGEGR0b3Itd2FzbS1yZWFkZXIHM2luZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4wLWdldC1lbnZpcm9ubWVudAg6aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLWZpbGVzeXN0ZW0tZXJyb3ItY29kZQlIaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4wLVttZXRob2RdZGVzY3JpcHRvci53cml0ZS12aWEtc3RyZWFtCklpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLmFwcGVuZC12aWEtc3RyZWFtC0BpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLmdldC10eXBlDDxpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjAtW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQNQGluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uY2hlY2std3JpdGUOOmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0ud3JpdGUPQ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gQTWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMC1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoETJpbmRpcmVjdC13YXNpOnJhbmRvbS9yYW5kb21AMC4yLjAtZ2V0LXJhbmRvbS1ieXRlcxI3aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3ByZW9wZW5zQDAuMi4wLWdldC1kaXJlY3Rvcmllcw');
    const module3 = base64Compile('AGFzbQEAAAABLghgBH9/f38Bf2ACf38Bf2ABfwBgAX8AYAJ/fwBgA39+fwBgBH9/f38AYAJ+fwACeBQAATAAAAABMQABAAEyAAEAATMAAQABNAACAAE1AAIAATYAAgABNwADAAE4AAQAATkABQACMTAABAACMTEABAACMTIABAACMTMABAACMTQABgACMTUABAACMTYABgACMTcABwACMTgAAwAIJGltcG9ydHMBcAETEwkZAQBBAAsTAAECAwQFBgcICQoLDA0ODxAREgAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjIwLjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      '[export]nornor:wasm-analyzer/reader@0.1.0': {
        '[resource-drop]component': trampoline1,
        '[resource-drop]wasm-reader': trampoline3,
        '[resource-new]component': trampoline0,
        '[resource-new]wasm-reader': trampoline2,
      },
      wasi_snapshot_preview1: {
        environ_get: exports0['2'],
        environ_sizes_get: exports0['3'],
        fd_write: exports0['0'],
        proc_exit: exports0['4'],
        random_get: exports0['1'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.0': {
        'get-environment': exports0['7'],
      },
      'wasi:cli/exit@0.2.0': {
        exit: trampoline11,
      },
      'wasi:cli/stderr@0.2.0': {
        'get-stderr': trampoline8,
      },
      'wasi:cli/stdin@0.2.0': {
        'get-stdin': trampoline9,
      },
      'wasi:cli/stdout@0.2.0': {
        'get-stdout': trampoline10,
      },
      'wasi:filesystem/preopens@0.2.0': {
        'get-directories': exports0['18'],
      },
      'wasi:filesystem/types@0.2.0': {
        '[method]descriptor.append-via-stream': exports0['10'],
        '[method]descriptor.get-type': exports0['11'],
        '[method]descriptor.stat': exports0['12'],
        '[method]descriptor.write-via-stream': exports0['9'],
        '[resource-drop]descriptor': trampoline4,
        'filesystem-error-code': exports0['8'],
      },
      'wasi:io/error@0.2.0': {
        '[resource-drop]error': trampoline6,
      },
      'wasi:io/streams@0.2.0': {
        '[method]output-stream.blocking-flush': exports0['15'],
        '[method]output-stream.blocking-write-and-flush': exports0['16'],
        '[method]output-stream.check-write': exports0['13'],
        '[method]output-stream.write': exports0['14'],
        '[resource-drop]input-stream': trampoline7,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:random/random@0.2.0': {
        'get-random-bytes': exports0['17'],
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': exports2.fd_write,
        '1': exports2.random_get,
        '10': trampoline15,
        '11': trampoline16,
        '12': trampoline17,
        '13': trampoline18,
        '14': trampoline19,
        '15': trampoline20,
        '16': trampoline21,
        '17': trampoline22,
        '18': trampoline23,
        '2': exports2.environ_get,
        '3': exports2.environ_sizes_get,
        '4': exports2.proc_exit,
        '5': exports1['nornor:wasm-analyzer/reader@0.1.0#[dtor]component'],
        '6': exports1['nornor:wasm-analyzer/reader@0.1.0#[dtor]wasm-reader'],
        '7': trampoline12,
        '8': trampoline13,
        '9': trampoline14,
      },
    }));
    realloc1 = exports1.cabi_realloc;
    postReturn0 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-module-information'];
    postReturn1 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-core-imports'];
    postReturn2 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-core-exports'];
    postReturn3 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-custom-sections'];
    postReturn4 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-child-components'];
    postReturn5 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-wit'];
    postReturn6 = exports1['cabi_post_nornor:wasm-analyzer/reader@0.1.0#[method]component.get-wat'];
    reader010ConstructorComponent = exports1['nornor:wasm-analyzer/reader@0.1.0#[constructor]component'];
    reader010MethodComponentGetType = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-type'];
    reader010MethodComponentGetModuleInformation = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-module-information'];
    reader010MethodComponentGetCoreImports = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-core-imports'];
    reader010MethodComponentGetCoreExports = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-core-exports'];
    reader010MethodComponentGetCustomSections = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-custom-sections'];
    reader010MethodComponentGetChildComponents = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-child-components'];
    reader010MethodComponentGetWit = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-wit'];
    reader010MethodComponentGetWat = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]component.get-wat'];
    reader010ConstructorWasmReader = exports1['nornor:wasm-analyzer/reader@0.1.0#[constructor]wasm-reader'];
    reader010MethodWasmReaderGetRootComponent = exports1['nornor:wasm-analyzer/reader@0.1.0#[method]wasm-reader.get-root-component'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;
const reader010 = {
  Component: Component,
  WasmReader: WasmReader,
  
};

export { reader010 as reader, reader010 as 'nornor:wasm-analyzer/reader@0.1.0',  }