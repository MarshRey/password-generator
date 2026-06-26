(function () {
  'use strict';

  const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };

  const AMBIGUOUS = /[0OIl1]/g;

  function getCrypto() {
    return window.crypto || window.msCrypto;
  }

  function getRandomInt(max) {
    const crypto = getCrypto();
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  function buildPool(options) {
    let pool = '';
    if (options.uppercase) pool += CHAR_SETS.uppercase;
    if (options.lowercase) pool += CHAR_SETS.lowercase;
    if (options.numbers) pool += CHAR_SETS.numbers;
    if (options.symbols) pool += CHAR_SETS.symbols;

    if (options.avoidAmbiguous) {
      pool = pool.replace(AMBIGUOUS, '');
    }

    return pool;
  }

  function generatePassword(options) {
    const pool = buildPool(options);
    const length = Math.max(8, Math.min(128, Number(options.length) || 16));

    if (!pool) {
      return '';
    }

    let password = '';
    for (let i = 0; i < length; i += 1) {
      password += pool.charAt(getRandomInt(pool.length));
    }

    return password;
  }

  function calculateEntropy(password, options) {
    if (!password) return 0;
    const pool = buildPool(options);
    if (!pool) return 0;
    return password.length * Math.log2(pool.length);
  }

  function getStrengthLabel(entropy) {
    if (entropy >= 120) return { label: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-500', width: '100%' };
    if (entropy >= 80) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-500', width: '75%' };
    if (entropy >= 50) return { label: 'Fair', color: 'text-amber-600', bg: 'bg-amber-500', width: '50%' };
    return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-500', width: '25%' };
  }

  function initPasswordGenerator() {
    const output = document.getElementById('password-output');
    const lengthInput = document.getElementById('password-length');
    const lengthValue = document.getElementById('password-length-value');
    const uppercase = document.getElementById('option-uppercase');
    const lowercase = document.getElementById('option-lowercase');
    const numbers = document.getElementById('option-numbers');
    const symbols = document.getElementById('option-symbols');
    const avoidAmbiguous = document.getElementById('option-ambiguous');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const strengthLabel = document.getElementById('strength-label');
    const strengthBar = document.getElementById('strength-bar');
    const strengthValue = document.getElementById('strength-value');
    const entropyValue = document.getElementById('entropy-value');

    if (!output || !generateBtn) return;

    function getOptions() {
      return {
        length: Number(lengthInput?.value) || 16,
        uppercase: uppercase?.checked ?? true,
        lowercase: lowercase?.checked ?? true,
        numbers: numbers?.checked ?? true,
        symbols: symbols?.checked ?? true,
        avoidAmbiguous: avoidAmbiguous?.checked ?? false,
      };
    }

    function updateStrength(password, options) {
      if (!strengthLabel || !strengthBar || !strengthValue || !entropyValue) return;

      const entropy = calculateEntropy(password, options);
      const strength = getStrengthLabel(entropy);

      strengthLabel.textContent = strength.label;
      strengthLabel.className = `font-semibold ${strength.color}`;
      strengthBar.className = `h-2 rounded-full transition-all duration-300 ${strength.bg}`;
      strengthBar.style.width = strength.width;
      strengthValue.textContent = strength.label;
      entropyValue.textContent = Math.round(entropy).toString();
    }

    function regenerate() {
      const options = getOptions();
      const password = generatePassword(options);
      output.value = password;
      updateStrength(password, options);
    }

    lengthInput?.addEventListener('input', function () {
      if (lengthValue) lengthValue.textContent = lengthInput.value;
      regenerate();
    });

    uppercase?.addEventListener('change', regenerate);
    lowercase?.addEventListener('change', regenerate);
    numbers?.addEventListener('change', regenerate);
    symbols?.addEventListener('change', regenerate);
    avoidAmbiguous?.addEventListener('change', regenerate);

    generateBtn.addEventListener('click', function () {
      regenerate();
      generateBtn.focus();
    });

    copyBtn?.addEventListener('click', async function () {
      if (!output.value) return;
      try {
        await navigator.clipboard.writeText(output.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(function () {
          copyBtn.textContent = originalText;
        }, 1500);
      } catch (err) {
        output.select();
        document.execCommand('copy');
      }
    });

    regenerate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordGenerator);
  } else {
    initPasswordGenerator();
  }
})();
