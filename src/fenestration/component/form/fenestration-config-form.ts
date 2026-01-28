import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {Fenestration, FenestrationType, SashOpeningDirection} from '../../model';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Checkbox} from 'primeng/checkbox';

/**
 * Nyílászáró konfiguráló form komponens.
 * Lehetővé teszi a nyílászáró típusának és paramétereinek módosítását.
 */
@Component({
  selector: 'app-fenestration-config-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Select, FormsModule, InputText, Checkbox],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="type">Nyílászáró típusa</label>
        <p-select
          id="type"
          [options]="typeOptions"
          [(ngModel)]="currentModel.type"
          (ngModelChange)="onTypeChange($event)"
          optionLabel="label"
          optionValue="value"
          placeholder="Válasszon típust"
          class="w-full">
        </p-select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="width">Szélesség (mm)</label>
        <input
          pInputText
          id="width"
          type="number"
          [(ngModel)]="currentModel.width"
          (ngModelChange)="onModelChange()"
          class="w-full"/>
      </div>

      <div class="flex flex-col gap-2">
        <label for="height">Magasság (mm)</label>
        <input
          pInputText
          id="height"
          type="number"
          [(ngModel)]="currentModel.height"
          (ngModelChange)="onModelChange()"
          class="w-full"/>
      </div>

      <div class="flex flex-col gap-2">
        <label for="frameThickness">Tok vastagsága (mm)</label>
        <input
          pInputText
          id="frameThickness"
          type="number"
          [(ngModel)]="currentModel.frameThickness"
          (ngModelChange)="onModelChange()"
          class="w-full"/>
      </div>

      <div class="flex flex-col gap-2">
        <label for="sashThickness">Szárny vastagsága (mm)</label>
        <input
          pInputText
          id="sashThickness"
          type="number"
          [(ngModel)]="currentModel.sashThickness"
          (ngModelChange)="onModelChange()"
          class="w-full"/>
      </div>

      <!-- Egyszárnyú ablak konfiguráció -->
      @if (currentModel.type === FenestrationType.SingleSashWindow) {
        <div class="flex flex-col gap-2">
          <label for="sashDirection">Nyílásirány</label>
          <p-select
            id="sashDirection"
            [options]="openingDirectionOptions"
            [(ngModel)]="currentModel.sashConfig!.openingDirection"
            (ngModelChange)="onSashConfigChange()"
            optionLabel="label"
            optionValue="value"
            class="w-full">
          </p-select>
        </div>

        <div class="flex items-center gap-2">
          <p-checkbox
            inputId="sashTilt"
            [(ngModel)]="currentModel.sashConfig!.tilt"
            (ngModelChange)="onSashConfigChange()"
            [disabled]="currentModel.sashConfig!.openingDirection === 'Fixed'"
            [binary]="true">
          </p-checkbox>
          <label for="sashTilt" [class.text-surface-400]="currentModel.sashConfig!.openingDirection === 'Fixed'">Bukó</label>
        </div>
      }

      <!-- Kétszárnyú ablak konfiguráció -->
      @if (currentModel.type === FenestrationType.DoubleSashWindow) {
        <div class="flex flex-col gap-2">
          <label for="leftSashDirection">Bal szárny nyílásirány</label>
          <p-select
            id="leftSashDirection"
            [options]="openingDirectionOptions"
            [(ngModel)]="currentModel.leftSashConfig!.openingDirection"
            (ngModelChange)="onLeftSashConfigChange()"
            optionLabel="label"
            optionValue="value"
            class="w-full">
          </p-select>
        </div>

        <div class="flex items-center gap-2">
          <p-checkbox
            inputId="leftSashTilt"
            [(ngModel)]="currentModel.leftSashConfig!.tilt"
            (ngModelChange)="onLeftSashConfigChange()"
            [disabled]="currentModel.leftSashConfig!.openingDirection === 'Fixed'"
            [binary]="true">
          </p-checkbox>
          <label for="leftSashTilt" [class.text-surface-400]="currentModel.leftSashConfig!.openingDirection === 'Fixed'">Bal szárny bukó</label>
        </div>

        <div class="flex flex-col gap-2">
          <label for="rightSashDirection">Jobb szárny nyílásirány</label>
          <p-select
            id="rightSashDirection"
            [options]="openingDirectionOptions"
            [(ngModel)]="currentModel.rightSashConfig!.openingDirection"
            (ngModelChange)="onRightSashConfigChange()"
            optionLabel="label"
            optionValue="value"
            class="w-full">
          </p-select>
        </div>

        <div class="flex items-center gap-2">
          <p-checkbox
            inputId="rightSashTilt"
            [(ngModel)]="currentModel.rightSashConfig!.tilt"
            (ngModelChange)="onRightSashConfigChange()"
            [disabled]="currentModel.rightSashConfig!.openingDirection === 'Fixed'"
            [binary]="true">
          </p-checkbox>
          <label for="rightSashTilt" [class.text-surface-400]="currentModel.rightSashConfig!.openingDirection === 'Fixed'">Jobb szárny bukó</label>
        </div>
      }
    </div>
  `
})
export class FenestrationConfigFormComponent {
  /** A modell melynek tulajdonságait szerkesztheti (two-way binding). */
  model = model.required<Fenestration>();

  /** FenestrationType enum referencia template-ben való használathoz. */
  protected readonly FenestrationType = FenestrationType;

  /** Típus választó opciók. */
  protected typeOptions = [
    { label: 'Egyszárnyú ablak', value: FenestrationType.SingleSashWindow },
    { label: 'Kétszárnyú ablak', value: FenestrationType.DoubleSashWindow }
  ];

  /** Nyílásirány választó opciók. */
  protected openingDirectionOptions = [
    { label: 'Fix', value: SashOpeningDirection.Fixed },
    { label: 'Balra nyíló', value: SashOpeningDirection.Left },
    { label: 'Jobbra nyíló', value: SashOpeningDirection.Right }
  ];

  /** Lokális model másolat a ngModel-hez. */
  protected get currentModel(): Fenestration {
    return this.model();
  }

  /** Típus változás kezelése. */
  protected onTypeChange(newType: FenestrationType): void {
    this.model.update(current => {
      const updated = {...current, type: newType};

      // Inicializálás típus alapján
      if (newType === FenestrationType.SingleSashWindow) {
        updated.sashConfig = updated.sashConfig || {
          openingDirection: SashOpeningDirection.Right,
          tilt: false
        };
        delete updated.leftSashConfig;
        delete updated.rightSashConfig;
      } else if (newType === FenestrationType.DoubleSashWindow) {
        updated.leftSashConfig = updated.leftSashConfig || {
          openingDirection: SashOpeningDirection.Left,
          tilt: false
        };
        updated.rightSashConfig = updated.rightSashConfig || {
          openingDirection: SashOpeningDirection.Right,
          tilt: false
        };
        delete updated.sashConfig;
      }

      return updated;
    });
  }

  /** Model változás kezelése. */
  protected onModelChange(): void {
    this.model.update(current => ({...current}));
  }

  /** Szárny konfiguráció változás kezelése (egyszárnyú ablak). */
  protected onSashConfigChange(): void {
    this.model.update(current => {
      const config = current.sashConfig!;
      // Ha fix, akkor bukó automatikusan false
      if (config.openingDirection === SashOpeningDirection.Fixed) {
        config.tilt = false;
      }
      return {
        ...current,
        sashConfig: { ...config }
      };
    });
  }

  /** Bal szárny konfiguráció változás kezelése (kétszárnyú ablak). */
  protected onLeftSashConfigChange(): void {
    this.model.update(current => {
      const config = current.leftSashConfig!;
      // Ha fix, akkor bukó automatikusan false
      if (config.openingDirection === SashOpeningDirection.Fixed) {
        config.tilt = false;
      }
      return {
        ...current,
        leftSashConfig: { ...config }
      };
    });
  }

  /** Jobb szárny konfiguráció változás kezelése (kétszárnyú ablak). */
  protected onRightSashConfigChange(): void {
    this.model.update(current => {
      const config = current.rightSashConfig!;
      // Ha fix, akkor bukó automatikusan false
      if (config.openingDirection === SashOpeningDirection.Fixed) {
        config.tilt = false;
      }
      return {
        ...current,
        rightSashConfig: { ...config }
      };
    });
  }
}
