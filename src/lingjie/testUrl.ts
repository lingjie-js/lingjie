import type { IframeRule, IframeObjectRule } from './iframe-manager';

export const testUrl = (url: string, rules: IframeRule[]): TryRuleResult => {
  if (isCrossOrigin(url)) {
    return {
      ok: false,
    };
  }

  for (const rule of rules) {
    const result = tryRule(rule, url);
    if (result.ok) {
      return result;
    }
  }

  return {
    ok: false,
  };
};

const isCrossOrigin = (url: string) => {
  if (typeof window === 'undefined') {
    return false;
  }
  const origin = new URL(url, window.location.href).origin;
  return origin !== window.location.origin;
};

export type TryRuleResult = {
  ok: true,
  rule?: IframeObjectRule
} | {
  ok: false,
}

const tryRule = (rule: IframeRule, url: string): TryRuleResult => {
  if (typeof rule === 'function') {
    if (rule(url)) {
      return {
        ok: true,
      };
    }
  } else if (rule instanceof RegExp) {
    if (rule.test(url)) {
      return { ok: true };
    }
  } else if (typeof rule === 'object') {
    return tryObjectRule(rule, url);
  }
  return {
    ok: false,
  };
};

const tryObjectRule = (rule: IframeObjectRule, url: string): TryRuleResult => {
  const result = tryRule(rule.test, url);

  if (!result.ok) {
    return {
      ok: false,
    };
  }

  if(rule.disabled){
    return {
      ok: false,
    };
  }

  if (rule.originList) {
    const origin = new URL(url).origin;
    if (!rule.originList.includes(origin)) {
      return {
        ok: false,
      };
    }
  }

  return {
    ok: true,
    rule,
  };
};
