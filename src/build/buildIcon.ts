import * as path from 'path';

import * as log from 'loglevel';

import { isOSX } from '../helpers/helpers';
import {
  convertToPng,
  convertToIco,
  convertToIcns,
} from '../helpers/iconShellHelpers';
import { AppOptions } from '../options/model';

function iconIsIco(iconPath: string): boolean {
  return path.extname(iconPath) === '.ico';
}

function iconIsPng(iconPath: string): boolean {
  return path.extname(iconPath) === '.png';
}

function iconIsIcns(iconPath: string): boolean {
  return path.extname(iconPath) === '.icns';
}

/**
 * Will convert a `.png` icon to the appropriate arch format (if necessary),
 * and return adjusted options
 */
export async function convertIconIfNecessary(
  options: AppOptions,
): Promise<void> {
  //TODO refactor (this is just a bunch of copy-paste)

  if (options.packager.platform === 'win32') {
    if (!options.packager.icon)
      log.debug(
        'Options "icon" not set, skipping icon conversion.',
      );
    else if (iconIsIco(options.packager.icon)) {
      log.debug(
        'Building for Windows and icon is already a .ico, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIco(options.packager.icon);
        options.packager.icon = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon to .ico, skipping.', error);
      }
    }

    if (!options.nativefier.iconStatus)
      log.debug(
        'Options "iconStatus" not set, skipping icon conversion.',
      );
    else if (iconIsIco(options.nativefier.iconStatus)) {
      log.debug(
        'Building for Windows and icon-status is already a .ico, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIco(
          options.nativefier.iconStatus,
          'icon-status',
        );
        options.nativefier.iconStatus = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-status to .ico, skipping.', error);
      }
    }

    if (!options.nativefier.iconTray)
      log.debug(
        'Options "iconTray" not set, skipping icon conversion.',
      );
    else if (iconIsIco(options.nativefier.iconTray)) {
      log.debug(
        'Building for Windows and icon-tray is already a .ico, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIco(
          options.nativefier.iconTray,
          'icon-tray',
        );
        options.nativefier.iconTray = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-tray to .ico, skipping.', error);
      }
    }
  } else if (options.packager.platform === 'linux') {
    if (!options.packager.icon)
      log.debug(
        'Options "icon" not set, skipping icon conversion.',
      );
    else if (iconIsPng(options.packager.icon)) {
      log.debug(
        'Building for Linux and icon is already a .png, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToPng(options.packager.icon);
        options.packager.icon = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon to .png, skipping.', error);
      }
    }

    if (!options.nativefier.iconStatus)
      log.debug(
        'Options "iconStatus" not set, skipping icon conversion.',
      );
    else if (iconIsPng(options.nativefier.iconStatus)) {
      log.debug(
        'Building for Linux and icon-status is already a .png, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToPng(
          options.nativefier.iconStatus,
          'icon-status',
        );
        options.nativefier.iconStatus = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-status to .png, skipping.', error);
      }
    }

    if (!options.nativefier.iconTray)
      log.debug(
        'Options "iconTray" not set, skipping icon conversion.',
      );
    else if (iconIsPng(options.nativefier.iconTray)) {
      log.debug(
        'Building for Linux and icon-tray is already a .png, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToPng(
          options.nativefier.iconTray,
          'icon-tray',
        );
        options.nativefier.iconTray = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-tray to .png, skipping.', error);
      }
    }
  } else if (isOSX()) {
    if (!options.packager.icon)
      log.debug(
        'Options "icon" not set, skipping icon conversion.',
      );
    else if (iconIsIcns(options.packager.icon)) {
      log.debug(
        'Building for macOS and icon is already a .icns, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIcns(options.packager.icon);
        options.packager.icon = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon to .icns, skipping.', error);
        options.packager.icon = undefined;
      }
    }

    if (!options.nativefier.iconStatus)
      log.debug(
        'Options "iconStatus" not set, skipping icon conversion.',
      );
    else if (iconIsIcns(options.nativefier.iconStatus)) {
      log.debug(
        'Building for macOS and icon-status is already a .icns, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIcns(
          options.nativefier.iconStatus,
          'icon-status',
        );
        options.packager.icon = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-status to .icns, skipping.', error);
        options.packager.icon = undefined;
      }
    }

    if (!options.nativefier.iconTray)
      log.debug(
        'Options "iconTray" not set, skipping icon conversion.',
      );
    else if (iconIsIcns(options.nativefier.iconTray)) {
      log.debug(
        'Building for macOS and icon-tray is already a .icns, no conversion needed',
      );
    } else {
      try {
        const iconPath = await convertToIcns(
          options.nativefier.iconTray,
          'icon-tray',
        );
        options.packager.icon = iconPath;
      } catch (error) {
        log.warn('Failed to convert icon-Tray to .icns, skipping.', error);
        options.packager.icon = undefined;
      }
    }
  } else {
    log.warn('Skipping icon conversion');
  }
}
