import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import { UnreadableCodeError } from '../../index';
import parse from '../parser';

const testsDir = path.resolve(__dirname, './wiki-syntax-spec/tests/');
const validTestDir = path.resolve(testsDir, 'valid');
const invalidTestDir = path.resolve(testsDir, 'invalid');

const validTestFiles = fs.readdirSync(validTestDir);
const inValidTestFiles = fs.readdirSync(invalidTestDir);

describe('Wiki syntax parser expected to be valid', () => {
  validTestFiles.forEach((file) => {
    const [prefix, suffix, ..._] = file.split('.');
    if (suffix !== 'wiki') {
      return;
    }

    if (!prefix) {
      throw new UnreadableCodeError('BUG: undefined file path prefix');
    }

    it(`${prefix} should be valid`, () => {
      const testFilePath = path.resolve(validTestDir, file);
      const expectedFilePath = path.resolve(validTestDir, `${prefix}.yaml`);

      const testContent = fs.readFileSync(testFilePath, 'utf8');
      const expectedContent = fs.readFileSync(expectedFilePath, 'utf8');

      const result = parse(testContent);
      const expected = yaml.load(expectedContent);

      expect(result).toEqual(expected);
    });
  });
});

describe('Wiki syntax parser expected to be inValid', () => {
  inValidTestFiles.forEach((file) => {
    const prefix = file.split('.')[0];
    if (!prefix) {
      throw new UnreadableCodeError('BUG: undefined file path prefix');
    }

    it(`${prefix} should be invalid`, () => {
      const testFilePath = path.resolve(invalidTestDir, file);
      const testContent = fs.readFileSync(testFilePath, 'utf8');

      expect(() => parse(testContent)).toThrowError();
    });
  });
});
